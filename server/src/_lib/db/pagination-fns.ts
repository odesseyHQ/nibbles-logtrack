import { isObject, forOwn } from 'lodash';
import {
  ReferenceExpression,
  SelectQueryBuilder,
  OrderByDirectionExpression,
} from 'kysely';
import { Database } from './db-types';
import {
  DEFAULT_LIMIT_OF_QRY,
  DEFAULT_OFFSET_OF_QRY,
  MAX_LIMIT_OF_QRY,
  MIN_OFFSET_OF_QRY,
} from './constants';
import { UndirectedOrderByExpression } from 'kysely/dist/cjs/parser/order-by-parser';
import { ValidationError } from '../error-handler';

// If you want to know more about T (generic type). Watch this video: https://www.youtube.com/watch?v=t0qQSujSslQ
interface IFilterQueryBuilder<T> {
  filterReqData: Record<string, any>;
  dbQuery: SelectQueryBuilder<Database, any, T>;
  allowedFilters: Array<keyof T>;
}
/**
 * The `filterQueryBuilder` function is a TypeScript function that takes in filter request data, a
 * database query, and a list of allowed filters, and returns a modified query based on the filters.
 * @param  - - `filterReqData`: The filter data that is passed to the function. It should be an object
 * containing the filter conditions.
 * @returns The function `filterQueryBuilder` returns the modified `dbQuery` object after applying the
 * filters specified in the `filterReqData` object.
 */
export const filterQueryBuilder = <T>({
  filterReqData,
  dbQuery,
  allowedFilters,
}: IFilterQueryBuilder<T>) => {
  let query = dbQuery;
  if (!isObject(filterReqData)) {
    throw new ValidationError({
      message: 'Filter not an object',
      cause: 'Passed invalid filer',
    });
  } else {
    forOwn(filterReqData, (indFilter, indFilterKey: string) => {
      type ParamFilterKeyType = ReferenceExpression<Database, keyof Database>;
      const paramFilterKey: ParamFilterKeyType =
        indFilterKey as ParamFilterKeyType;

      const checkIfParamFilterKeyIsAllowed = (
        allowedFilters: Array<keyof T>,
        paramFilterKey: ParamFilterKeyType,
      ) => {
        if (allowedFilters.every((_value) => typeof _value === 'string')) {
          return allowedFilters.includes(paramFilterKey as keyof T);
        }
        return false;
      };
      if (
        indFilter &&
        isObject(indFilter) &&
        checkIfParamFilterKeyIsAllowed(allowedFilters, paramFilterKey) // safe guarding from sql query injection
      ) {
        forOwn(indFilter, (value, operation) => {
          switch (operation) {
            case 'GT':
              query = query.where(paramFilterKey, '>', value);
              break;
            case 'LT':
              query = query.where(paramFilterKey, '<', value);
              break;
            case 'IN':
              query = query.where(paramFilterKey, 'in', value);
              break;
            case 'NEQ':
              query = query.where(paramFilterKey, '!=', value);
              break;
            case 'EQ':
              query = query.where(paramFilterKey, '=', value);
              break;
            default:
              throw new ValidationError({
                message: `Unsupported filter operation: ${operation}`,
                cause: 'Unsupported filter param',
              });
          }
        });
      } else {
        throw new ValidationError({
          message: 'Invalid filter param passed to pagination',
          cause: 'Unsupported filter param',
        });
      }
    });
  }
  return query;
};

/**
 * The `paginatedQueryBuilder` function is a TypeScript function that builds a paginated database query
 * based on filter and sort criteria.
 * @param  - - `filterReqData`: The filter request data used to filter the query results.
 * @returns The `paginatedQueryBuilder` function returns a query object that includes filtering,
 * sorting, limiting, and offsetting functionality.
 */
interface IPaginatedQueryBuilder<T> extends IFilterQueryBuilder<T> {
  sortReqData?: {
    sortKey: string;
    sortOrder: 'ASC' | 'DESC';
  };
  limit?: number;
  offset?: number;
}

export const paginatedQueryBuilder = <T>({
  filterReqData,
  sortReqData,
  limit = DEFAULT_LIMIT_OF_QRY,
  offset = DEFAULT_OFFSET_OF_QRY,
  dbQuery,
  allowedFilters,
}: IPaginatedQueryBuilder<T>) => {
  let query = filterQueryBuilder({
    dbQuery,
    filterReqData,
    allowedFilters,
  });
  if (sortReqData?.sortKey && sortReqData?.sortOrder) {
    let order: OrderByDirectionExpression = 'asc';

    switch (sortReqData?.sortOrder) {
      case 'ASC':
        order = 'asc';
        break;
      case 'DESC':
        order = 'desc';
        break;
    }
    query = query.orderBy(
      sortReqData?.sortKey.toString() as UndirectedOrderByExpression<
        Database,
        keyof Database,
        T
      >,
      order,
    );
  }

  if (offset >= MIN_OFFSET_OF_QRY && limit < MAX_LIMIT_OF_QRY) {
    query = query.offset(offset).limit(limit);
  } else {
    query = query.offset(MIN_OFFSET_OF_QRY).limit(DEFAULT_LIMIT_OF_QRY);
  }

  return query;
};

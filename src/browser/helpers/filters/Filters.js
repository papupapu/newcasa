import { DEFAULT_FILTERS_VALUES } from '../../constants/filters/Filters';

export function computeActiveFilters(filters) {
  const filtersKeys = Object.keys(filters);
  const activeFilters = {};
  let filtersCount = 0;
  filtersKeys.forEach(
    (el, index) => {
      const scope = filtersKeys[index];
      const type = typeof filters[scope];
      const value = filters[scope];
      // basic value
      let condition = true;
      if (type === 'string' || type === 'boolean') {
        condition = value === DEFAULT_FILTERS_VALUES[scope];
      } else if (type === 'object') {
        condition = filters[scope][0] === DEFAULT_FILTERS_VALUES[scope][0];
      }
      if (!condition) {
        if (
          scope.indexOf('price') > -1 &&
          (
            Object.keys(activeFilters).indexOf('priceMin') === -1 &&
            Object.keys(activeFilters).indexOf('priceMax') === -1
          )
        ) {
          filtersCount += 1;
        } else if (
          scope.indexOf('mq') > -1 &&
          (
            Object.keys(activeFilters).indexOf('mqMin') === -1 &&
            Object.keys(activeFilters).indexOf('mqMax') === -1
          )
        ) {
          filtersCount += 1;
        } else if (
          // some filters do not update the count
          scope !== 'surrounding' &&
          scope !== 'category' &&
          scope !== 'contratto' &&
          scope.indexOf('price') === -1 &&
          scope.indexOf('mq') === -1
        ) {
          filtersCount += 1;
        }
        activeFilters[scope] = value;
      }
    },
  );
  if (!('category' in activeFilters)) {
    activeFilters.category = filters.category;
  }
  return [activeFilters, filtersCount];
}

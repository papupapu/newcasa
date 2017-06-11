export function computeSearchUrl(channel, activeFilters) {
  let searchUrl = `/${channel}-${activeFilters.category}/`;

  let propertyTypesFlag = false;
  let mqFlag = false;
  let priceFlag = false;
  let localitiesFlag = false;

  // PROPERTY TYPES
  if (
    'propertyTypes' in activeFilters &&
    activeFilters.propertyTypes.length > 0 &&
    activeFilters.propertyTypes[0] !== 'all'
  ) {
    const propertyTypes = activeFilters.propertyTypes.join('-').replace(/\//g, '+').toLowerCase();
    searchUrl += `immobile-${propertyTypes}`;
    propertyTypesFlag = true;
  }

  // SIZE
  if (
    ('mqMin' in activeFilters && activeFilters.mqMin !== 'all') ||
    ('mqMax' in activeFilters && activeFilters.mqMax !== 'all')
  ) {
    const sep = propertyTypesFlag ? '-' : '';
    let mqMin = '0';
    let mqMax = 'qualsiasi';
    if ('mqMin' in activeFilters) {
      mqMin = activeFilters.mqMin;
    }
    if ('mqMax' in activeFilters) {
      mqMax = activeFilters.mqMax;
    }
    searchUrl += `${sep}dimensione-${mqMin}-${mqMax}`;
    mqFlag = true;
  }

  // PRICE
  if (
    ('priceMin' in activeFilters && activeFilters.priceMin !== 'all') ||
    ('priceMax' in activeFilters && activeFilters.priceMax !== 'all')
  ) {
    const sep = propertyTypesFlag || mqFlag ? '-' : '';
    let priceMin = '0';
    let priceMax = 'qualsiasi';
    if ('priceMin' in activeFilters) {
      priceMin = activeFilters.priceMin.replace(/\./g, '');
    }
    if ('priceMax' in activeFilters) {
      priceMax = activeFilters.priceMax.replace(/\./g, '');
    }
    searchUrl += `${sep}per-${priceMin}-${priceMax}`;
    priceFlag = true;
  }

  const slash = propertyTypesFlag || mqFlag || priceFlag || localitiesFlag ? '/' : '';
  searchUrl += `${slash}lista-1`;

  // SOURCE REFINEMENTS
  if (
    'numRooms' in activeFilters ||
    'numBaths' in activeFilters ||
    'numParkingSpaces' in activeFilters ||
    'garden' in activeFilters ||
    'heating' in activeFilters ||
    'sellerType' in activeFilters ||
    'photo' in activeFilters ||
    'balcony' in activeFilters ||
    'terrace' in activeFilters ||
    'list' in activeFilters ||
    ('surrounding' in activeFilters && !activeFilters.surrounding)
  ) {
    searchUrl += '?source=refinements';
  }

  // SELLER TYPE
  if ('sellerType' in activeFilters) {
    const sellerType = activeFilters.sellerType.join(',');
    searchUrl += `&sellerType=${sellerType}`;
  }

  // ROOMS
  if ('numRooms' in activeFilters) {
    searchUrl += `&numRooms=${activeFilters.numRooms}`;
  }

  // BATHROOMS
  if ('numBaths' in activeFilters) {
    searchUrl += `&numBaths=${activeFilters.numBaths}`;
  }

  // PARKING SPACES
  if ('numParkingSpaces' in activeFilters) {
    searchUrl += `&numParkingSpaces=${activeFilters.numParkingSpaces}`;
  }

  // PHOTO ONLY
  if ('photo' in activeFilters) {
    searchUrl += '&misc=photo-only';
  }

  // EXTERIOR FEATURES
  if (
    'garden' in activeFilters ||
    'balcony' in activeFilters ||
    'terrace' in activeFilters
  ) {
    searchUrl += '&exteriorFeatures=';

    let gardenFlag = false;
    let balconyFlag = false;

    // GARDEN
    if ('garden' in activeFilters) {
      searchUrl += `giardino-${activeFilters.garden}`;
      gardenFlag = true;
    }

    // BALCONY
    if ('balcony' in activeFilters) {
      const comma = gardenFlag ? ',' : '';
      searchUrl += `${comma}balcone`;
      balconyFlag = true;
    }

    // TERRACE
    if ('terrace' in activeFilters) {
      const comma = gardenFlag || balconyFlag ? ',' : '';
      searchUrl += `${comma}terrazzo`;
    }
  }

  // INTERIOR FEATURES
  if (
    'heating' in activeFilters ||
    'lift' in activeFilters
  ) {
    searchUrl += '&interiorFeatures=';

    let heatingFlag = false;

    // HEATING
    if ('heating' in activeFilters) {
      searchUrl += `riscaldamento-${activeFilters.heating}`;
      heatingFlag = true;
    }

    // LIFT
    if ('lift' in activeFilters) {
      const comma = heatingFlag ? ',' : '';
      searchUrl += `${comma}ascensore`;
    }
  }

  if ('surrounding' in activeFilters && !activeFilters.surrounding) {
    searchUrl += '&includeSurrounding=false';
  }

  return searchUrl;
}

import React from 'react';

export default async function waterIntakeWeightFormula(weight: number | undefined | null | string) {
  let parsedWeight: number | undefined;

  if (typeof weight === 'string') {
    parsedWeight = parseInt(weight);
  } else if (typeof weight === 'number') {
    parsedWeight = weight;
  } else {
    parsedWeight = undefined;
  }

  return parsedWeight ? parsedWeight * (2 / 3) : 100;
}

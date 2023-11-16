const infoApiCleaner = (array) => {
  return array.map((dog) => {
    return {
      key: dog.id,
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      temperament: dog.temperament,
      reference_image_id: dog.image.url,
    };
  });
};

const infoDBCleaner = (array) => {
  return array.map((dog) => {
    return {
      key: dog.id,
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperaments
        .map((temperament) => temperament.name)
        .join(", "),
      reference_image_id: dog.reference_image_id,
    };
  });
};

module.exports = {
  infoApiCleaner,
  infoDBCleaner,
};

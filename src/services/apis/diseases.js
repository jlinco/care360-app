import airtableBase from '../airtable'

const getDiseasesApi = async () => {
  const table = airtableBase('Diseases')
  try {
    const diseases = await table.select({ maxRecords: 100 }).firstPage()
    return diseases
  } catch (e) {
    throw new Error(e)
  }
}

const createNewDisease = async data => {
  const table = airtableBase('Diseases')
  try {
    const disease = await table.create([data])
    const formattedDisease = disease.map(rec => ({
      id: rec.id,
      ...rec.fields,
    }))
    return formattedDisease
  } catch (e) {
    throw new Error(e)
  }
}

export { getDiseasesApi, createNewDisease }

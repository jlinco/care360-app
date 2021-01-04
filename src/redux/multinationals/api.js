import airtableBase from 'services/airtable'

const getAllMultiNationalsAPI = async () => {
  const table = airtableBase('MultiNationals')
  try {
    const multis = await table.select().eachPage()
    const formattedMultis = multis.map(multi => ({
      id: multi.id,
      ...multi.fields,
    }))
    return formattedMultis
  } catch (e) {
    throw new Error(e)
  }
}

const createNewMultiNational = async data => {
  const table = airtableBase('MultiNationals')
  try {
    const multinational = await table.create([data])
    const formattedMulti = multinational.map(rec => ({
      id: rec.id,
      ...rec.fields,
    }))
    return formattedMulti
  } catch (e) {
    throw new Error(e)
  }
}

export { getAllMultiNationalsAPI, createNewMultiNational }

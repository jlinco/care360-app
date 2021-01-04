import airtableBase from 'services/airtable'

const getDiseaseMedicationsAPI = async () => {
  const table = airtableBase('Disease_Medication')
  try {
    const dms = await table.select().eachPage()
    const formattedDMS = dms.map(dm => ({
      id: dm.id,
      ...dm.fields,
    }))
    return formattedDMS
  } catch (e) {
    throw new Error(e)
  }
}

const getAllHospitalsAPI = async () => {
  const table = airtableBase('Hospitals')
  try {
    const hospitals = await table.select().eachPage()
    const formattedHospitals = hospitals.map(hospital => ({
      id: hospital.id,
      ...hospital.fields,
    }))
    return formattedHospitals
  } catch (e) {
    throw new Error(e)
  }
}

export { getDiseaseMedicationsAPI, getAllHospitalsAPI }

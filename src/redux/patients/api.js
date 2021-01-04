// import { notification } from 'antd'
import airtableBase from 'services/airtable'

const getPatientsApi = async () => {
  const table = airtableBase('Patients')
  try {
    const patients = await table.select().firstPage()
    const formattedPatients = patients.map(patient => ({
      id: patient.id,
      ...patient.fields,
    }))
    return formattedPatients
  } catch (e) {
    throw new Error(e)
  }
}

const getPatientByIdApi = async id => {
  const table = airtableBase('Patients')
  try {
    const patient = await table.find(id)
    const formattedResponse = {
      id: patient.id,
      ...patient.fields,
    }
    return formattedResponse
  } catch (e) {
    throw new Error(e)
  }
}

const createNewPatient = async data => {
  const table = airtableBase('Patients')
  try {
    const patient = await table.create([data])
    const formattedPatient = patient.map(rec => ({
      id: rec.id,
      ...rec.fields,
    }))
    return formattedPatient
  } catch (e) {
    throw new Error(e)
  }
}

export { getPatientsApi, getPatientByIdApi, createNewPatient }

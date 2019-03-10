import permissions from './permissions';

let types = {
  "receptionist" : {
    name: 'receptionist',
    canCreate: true,
    permissions: []
  },
  "doctor": {
    name: 'doctor',
    canCreate: false,
    permissions: [ permissions['surgeries'], permissions['labTests'], permissions['bloodDonations'], permissions['radiology'], permissions['diagnosis'] ]
  },
  "radiologist": {
    name: 'radiologist',
    canCreate: false,
    permissions: [permissions['radiology']]
  },
  "laboratoryTechnician": {
    name: 'laboratoryTechnician',
    canCreate: false,
    permissions: [permissions['labTests']],
  }
}

export default types;
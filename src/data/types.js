// This file contains the list of staff types for a hospital. Depending of the staff type, the appropriate page is rendered.
// Every type containes the following info: name, canCreate, permissions.
// canCreate indicated weather or not the type can create a new medical record.
// permissions lists the different permissions for the type.

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
let types = [
  {
    name: 'receptionist',
    canCreate: true,
    permissions: []
  },
  {
    name: 'doctor',
    canCreate: false,
    permessions: ['surgeries', 'labTests', 'radiology', ]
  },
  {
    name: 'radiologist',
    canCreate: false,
    permissions: ['radiology']
  },
  {
    name: 'laboratoryTechnician',
    canCreate: false,
    permissions: ['labTests'],
  }
]
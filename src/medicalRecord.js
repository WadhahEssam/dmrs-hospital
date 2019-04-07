const medicalRecordABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "surgeriesCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "emergencyContactsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_type",
				"type": "uint256"
			},
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "markTransactionAsMedicalError",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "hospitalName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "diagnosisesCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"name": "_surgeryName",
				"type": "string"
			},
			{
				"name": "_mainDoctor",
				"type": "string"
			},
			{
				"name": "_duration",
				"type": "uint256"
			},
			{
				"name": "_fileHash",
				"type": "string"
			},
			{
				"name": "_surgeryInformation",
				"type": "string"
			},
			{
				"name": "_isCorrectionFor",
				"type": "string"
			}
		],
		"name": "addSurgery",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "drugPrescribtions",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "hospitalName",
				"type": "string"
			},
			{
				"name": "doctorName",
				"type": "string"
			},
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "drugList",
				"type": "string"
			},
			{
				"name": "drugListCount",
				"type": "uint256"
			},
			{
				"name": "isCorrectionFor",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "laboratoryTestsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "submissionDate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "medicalRecordAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dateOfBirth",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "phoneNumber",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "gender",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_editedDrugList",
				"type": "string"
			}
		],
		"name": "markDrugAsDispensed",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "diagnosises",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "hospitalName",
				"type": "string"
			},
			{
				"name": "doctorName",
				"type": "string"
			},
			{
				"name": "diognosisDescription",
				"type": "string"
			},
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "isCorrectionFor",
				"type": "string"
			},
			{
				"name": "fileHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bloodDonations",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "hospitalName",
				"type": "string"
			},
			{
				"name": "doctorName",
				"type": "string"
			},
			{
				"name": "donationType",
				"type": "string"
			},
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "fileHash",
				"type": "string"
			},
			{
				"name": "isCorrectionFor",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"name": "_doctorName",
				"type": "string"
			},
			{
				"name": "_drugList",
				"type": "string"
			},
			{
				"name": "_isCorrectionFor",
				"type": "string"
			}
		],
		"name": "addDrugPrescribtion",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"name": "_doctorName",
				"type": "string"
			},
			{
				"name": "_diognosisDescription",
				"type": "string"
			},
			{
				"name": "_fileHash",
				"type": "string"
			},
			{
				"name": "_isCorrectionFor",
				"type": "string"
			}
		],
		"name": "addDiagnosis",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "emergencyContacts",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bloodDonationsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"name": "_doctorName",
				"type": "string"
			},
			{
				"name": "_donationType",
				"type": "string"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_fileHash",
				"type": "string"
			},
			{
				"name": "_isCorrectionFor",
				"type": "string"
			}
		],
		"name": "addBloodDonation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"name": "_laboratoryWorkerName",
				"type": "string"
			},
			{
				"name": "_testType",
				"type": "string"
			},
			{
				"name": "_laboratoryTestDescription",
				"type": "string"
			},
			{
				"name": "_fileHash",
				"type": "string"
			},
			{
				"name": "_isCorrectionFor",
				"type": "string"
			}
		],
		"name": "addLaboratoryTest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nationalID",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "drugPrescribtionsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "surgeries",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "mainDoctor",
				"type": "string"
			},
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "surgeryInformation",
				"type": "string"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "isCorrectionFor",
				"type": "string"
			},
			{
				"name": "hospitalName",
				"type": "string"
			},
			{
				"name": "surgeryName",
				"type": "string"
			},
			{
				"name": "fileHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "bloodType",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "laboratoryTests",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "hospitalName",
				"type": "string"
			},
			{
				"name": "laboratoryWorkerName",
				"type": "string"
			},
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "testType",
				"type": "string"
			},
			{
				"name": "laboratoryTestDescription",
				"type": "string"
			},
			{
				"name": "testHash",
				"type": "string"
			},
			{
				"name": "isCorrectionFor",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_phoneNumber",
				"type": "string"
			}
		],
		"name": "addEmergencyContact",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "nationalIDI",
				"type": "uint256"
			},
			{
				"name": "nameI",
				"type": "string"
			},
			{
				"name": "birthDateI",
				"type": "uint256"
			},
			{
				"name": "phoneNumberI",
				"type": "string"
			},
			{
				"name": "genderI",
				"type": "string"
			},
			{
				"name": "bloodTypeI",
				"type": "string"
			},
			{
				"name": "emergencyContactI",
				"type": "string"
			},
			{
				"name": "hospitalNameI",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

export default medicalRecordABI;
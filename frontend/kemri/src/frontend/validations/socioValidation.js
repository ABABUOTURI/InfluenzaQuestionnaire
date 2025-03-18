// import * as yup from 'yup';

// const socioValidationSchema = yup.object({
//   serial_number: yup.string().required('Serial number is required'),

//   date_of_data_collection: yup.date()
//     .typeError('Invalid date format')  // Ensures the input is a valid date
//     .required('Date of collection is required'),

//   age: yup.number()
//     .min(15, 'Age must be between 15 and 19')
//     .max(19, 'Age must be between 15 and 19')
//     .required('Age is required'),

//   relationship: yup.string().required('Relationship is required'),

//   guardian_occupation: yup.string().required('Occupation is required'),

//   guardian_education: yup.string().required('Education level is required'),

//   respondent_religion: yup.string().required('Religion is required'),

//   family_size: yup.number()
//     .min(1, 'Family size must be at least 1')
//     .max(50, 'Family size must be between 1 and 50')
//     .required('Family size is required'),

//   has_siblings: yup.string().required('Please specify if you have siblings'),

//   siblings_have_partners: yup.string().when('has_siblings', ([siblings], schema) => {
//     return siblings === 'YES'
//       ? schema.required('Please specify if siblings have partners')
//       : schema.notRequired();
//   }),

//   gets_pocket_money: yup.string().required('Pocket money info is required'),

//   pocket_money_adequate: yup.string().when('gets_pocket_money', ([pocketMoney], schema) => {
//     return pocketMoney === 'YES'
//       ? schema.required('Please specify if the pocket money is adequate')
//       : schema.notRequired();
//   }),
// });

// export default socioValidationSchema;

import * as yup from 'yup';

const socioValidationSchema = yup.object({
  serial_number: yup.string().notRequired('Serial number is required'),

  date_of_data_collection: yup.date()
    .typeError('Invalid date format')
    .notRequired('Date of collection is required'),

  age: yup.number()
    .min(15, 'Age must be between 15 and 19')
    .max(19, 'Age must be between 15 and 19')
    .required('Age is required'),

  relationship: yup.string().required('Relationship is required'),

  guardian_occupation: yup.string().required('Occupation is required'),

  guardian_education: yup.string().required('Education level is required'),

  respondent_religion: yup.string().required('Religion is required'),

  family_size: yup.number()
    .min(1, 'Family size must be at least 1')
    .max(50, 'Family size must be between 1 and 50')
    .required('Family size is required'),

  has_siblings: yup.string().required('Please specify if you have siblings'),

  siblings_have_partners: yup.string().when('has_siblings', {
    is: 'YES',
    then: (schema) => schema.required('Please specify if siblings have partners'),
    otherwise: (schema) => schema.nullable().notRequired(), // ✅ Allow it to be empty
  }),

  gets_pocket_money: yup.string().required('Pocket money info is required'),

  pocket_money_adequate: yup.string().when('gets_pocket_money', {
    is: 'YES',
    then: (schema) => schema.required('Please specify if the pocket money is adequate'),
    otherwise: (schema) => schema.nullable().notRequired(), // ✅ Allow empty
  }),
});

export default socioValidationSchema;

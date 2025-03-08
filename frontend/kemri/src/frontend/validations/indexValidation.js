import * as Yup from 'yup';

const indexValidationSchema = Yup.object({
  financial_support: Yup.string().required('Financial support source is required'),

  guardian_visits: Yup.string().required('Please select guardian visit status'),

  alternative_visitor: Yup.string().when('guardian_visits', (guardian_visits, schema) => 
    guardian_visits === 'NO'
      ? schema.required('Please specify the alternative visitor')
      : schema.notRequired()
  ),

  // access_to_reproductive_health_info: Yup.string().required('Please indicate access to reproductive health info'),

  access_to_reproductive_health_info: Yup.string()
  .required('Please indicate access to reproductive health info'),

information_adequate: Yup.string().when('access_to_reproductive_health_info', {
  is: 'NO',
  then: (schema) => schema.nullable().notRequired(), // Disabled when "NO"
  otherwise: (schema) => schema.required('Please indicate if the information is adequate'),
}),

educator_name: Yup.array()
  .of(Yup.string())
  .when('access_to_reproductive_health_info', {
    is: 'NO',
    then: (schema) => schema.notRequired().nullable(), // Disabled when "NO"
    otherwise: (schema) => schema.min(1, 'You must select at least one educator if you have access to information'),
  }),

topic_name: Yup.array()
  .of(Yup.string())
  .when(['access_to_reproductive_health_info', 'educator_name'], ([access, educators], schema) => {
    if (access === 'NO') {
      return schema.notRequired().nullable(); // Disabled when "NO"
    }
    if (Array.isArray(educators) && educators.length > 0) {
      return schema.min(1, 'You must select at least one topic if you have selected educators');
    }
    return schema.notRequired();
  }),
});

export default indexValidationSchema;

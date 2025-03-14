const API_URL = 'http://localhost:8000/api/submit/';  // Your API endpoint

export const submitForm = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const data = await response.json();
    console.log('Form submitted successfully', data);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

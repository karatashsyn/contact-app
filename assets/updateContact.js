import axios from 'axios';

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/contacts/update',
      data: {
        name,
        number,
      },
    });

    if (res.data.status === 'success') {
      alert('Contact Updated Successfully');
    }
  } catch (err) {
    alert('Something Went Wrong');
  }
};

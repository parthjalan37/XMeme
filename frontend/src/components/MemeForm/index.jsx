import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Error, Center, InputField, Wrapper, Input, Button, Label} from './styles';
require('dotenv').config();

export default () => (

  <Wrapper>
    <h1>Meme Stream</h1>
    <Formik
      initialValues={{name: '', caption: '', url: '', success: false,}}

      //Form Validation
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Meme owner field is required'),
        caption: Yup.string().required('Caption field is required'),
        url: Yup.string().required('Meme URL field is required')
      })}

      onSubmit={async ({ name, caption, url}, { setSubmitting, resetForm, setFieldValue }) => {
        try {
          //API request for checking if entered meme URL already exists
          const response = await axios({
            method: 'POST',
            url: "http://localhost:8081/memes/duplicate",
            headers: {'Content-Type': 'application/json',},
            data: JSON.stringify({name,caption,url,}),
          });

            try {
              //POST API request for submitting a meme 
              await axios({
                method: 'POST',
                url: "http://localhost:8081/memes",
                headers: {'Content-Type': 'application/json',},
                data: JSON.stringify({name,caption,url,}),
              });
              setSubmitting(false);
              setFieldValue('success', true);

              //Reload page to display newly added meme
              window.location.href = window.location.href;
              
              //Reset form
              setTimeout(() => resetForm(), 6000);
            } catch (err) {
              setSubmitting(false);
              setFieldValue('success', false);
              alert("Something went wrong, please try again!");
            }

        } catch(err){
          alert("This meme URL already exists. Please enter another one.");
        }
      }}
    >

      {({ values, touched, errors, setFieldValue, isSubmitting }) => (
        //Form for submitting a meme
        <Form>
          <Label>Meme Owner</Label>
          <InputField>
            <Input
              as={FastField}
              type="text"
              name="name"
              component="input"
              aria-label="name"
              placeholder="Enter your full name"
              error={touched.name && errors.name}
            />
            <br/>
            <ErrorMessage component={Error} name="name" />
          </InputField>
          <Label>Caption</Label>
          <InputField>
            <Input
              as={FastField}
              type="text"
              name="caption"
              component="input"
              aria-label="caption"
              placeholder="Be creative with the caption"
              error={touched.caption && errors.caption}
            />
            <br/>
            <ErrorMessage component={Error} name="caption" />
          </InputField>
          <Label>Meme URL</Label>
          <InputField>
            <Input
              as={FastField}
              type="text"
              name="url"
              component="input"
              aria-label="url"
              placeholder="Enter URL of your meme here"
              error={touched.url && errors.url}
            />
            <br/>
            <ErrorMessage component={Error} name="url" />
          </InputField>
          {/* Display message on successful submission of meme */}
          {values.success && (
            <InputField>
              <Center>
                <h4>Your meme has been successfully sent!</h4>
              </Center>
            </InputField>
          )}
          <Center>
            <Button secondary type="submit" disabled={isSubmitting} className="submit-btn">
              Submit Meme
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  </Wrapper>
);

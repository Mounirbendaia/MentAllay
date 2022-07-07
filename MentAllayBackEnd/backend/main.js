// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const express= require('express');
const app = express();
const bodyParser = require('body-parser')
const mangoose=require('mongoose');
const { default: mongoose } = require('mongoose');
require('./Feelings')
const Feelings=mangoose.model("feeling")
// password = VY0vU7icawhaqrv8  // cEUyIF5sgdYnzf6Y
const mongoUrl= "****************************"
mangoose.connect(mongoUrl,{
  useNewUrlParser: true
})
mongoose.connection.on("connected",()=>{
  console.log("conected")
})
mongoose.connection.on("error",()=>{
  console.log("error",err)
})

app.use(bodyParser.json())
'use strict';
const users = [{name: 'MamE'}]
app.get('/users', (req,res)=> {
  const name=req.params.name;
  res.send("test" )
  res.json(users)
})
app.post('/save' , (req,res) => {

const feelings = new Feelings({
  feeling:req.body.feeling
}

)
feelings.save().then(data=> {
  console.log(data)
  res.send(feelings)
}).catch(err => {
  console.log(err)
}
)

})

app.post('/pre', (req,res)=> {
  const feeling = req.body.feeling
console.log(feeling)
  function main(
  projectId = "****************************",
  location = "****************************",
  modelId = "****************************",
  content = feeling
) {
  // [START automl_language_text_classification_predict]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const location = 'us-central1';
  // const modelId = 'YOUR_MODEL_ID';
  // const content = 'text to predict'

  // Imports the Google Cloud AutoML library
  const {PredictionServiceClient} = require('@google-cloud/automl').v1;

  // Instantiates a client
  const client = new PredictionServiceClient();

  async function predict() {
    // Construct request
    const request = {
      name: client.modelPath(projectId, location, modelId),
      payload: {
        textSnippet: {
          content: content,
          mimeType: 'text/plain', // Types: 'text/plain', 'text/html'
        },
      },
    };

    const [response] = await client.predict(request);
    console.log(content);

    for (const annotationPayload of response.payload) {
      res.send(`${annotationPayload.displayName}`);
      res.status(200).json(
        `Predicted class score: ${annotationPayload.classification.score}`
      );
    }

  }

  predict();
  // [END automl_language_text_classification_predict]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
})



const { initializeApp } = require('firebase-admin/app');
var fbAdmin = require('firebase-admin');
const { getAuth } = require("firebase-admin/auth");
const { getDatabase } = require("firebase-admin/database");

initializeApp({
  credential: fbAdmin.credential.cert({type: "service_account",
  project_id: "****************************",
  private_key_id: "****************************",
  private_key:"****************************",
  client_email: "****************************",
  client_id: "****************************",
  auth_uri: "****************************",
  token_uri: "****************************",
  auth_provider_x509_cert_url: "****************************",
  client_x509_cert_url: "****************************"
}),
  databaseURL: "****************************"
});
app.post('/delete', (req,res)=> {
  const userid = req.body.userid

getAuth()
  .deleteUser(userid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });

 


})
app.listen(3000)

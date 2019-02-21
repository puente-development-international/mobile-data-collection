import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ParseProvider } from '../parse/parse';

@Injectable()
export class QueryServiceProvider {

  constructor(private parseSrvc: ParseProvider) {
    console.log('Hello QueryServiceProvider Provider');
    parseSrvc.parseInitialize();
  }


  async distinctUsers() {
    //This is Retrieving Results from Parse Server
    let Parse = this.parseSrvc.getParseENV();

    const query = new Parse.Query('User');
    
    var users = await query.find()
    
    return users
         
  }

  /**
  * Queries results based on the Object and Column
  * 
  * @example
  * genericQuery(SurveyData,organization)
  * 
  * @param {string} parseObject Name of the Backend Model
  * @param {string} parseColumn Name of the Column in the Backend Model
  * @returns query of results in backend
  */
  public genericQuery(parseObject: string, parseColumn: string): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parseSrvc.getParseENV();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseObject);

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(SurveyData);
        

        //Limiting Results based on a class
        query.equalTo(parseColumn);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }
  
  /**
  * Performs a query based on the parameter defined in a column
  * 
  * @example
  * basicQuery(0,1000,SurveyData,organization,Puente)
  * 
  * @param {number} offset First number
  * @param {number} limit Max limit of results
  * @param {string} parseObject Name of Backend Model
  * @param {string} parseColumn Name of Column in Backend Model
  * @param {string} parseParam Name of Parameter in Column 
  * @returns Results of Query
  */
  public basicQuery(offset: number = 0, limit: number = 3, parseObject: string, parseColumn: string, parseParam: string): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parseSrvc.getParseENV();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseObject);

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(SurveyData);
        
        //You can skip the first results by setting skip
        query.skip(offset);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        // Retrieve the most recent ones
        query.descending("createdAt");

        //Limiting Results based on a class
        query.equalTo(parseColumn,parseParam);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }
  
  /**
  * Performs a query based on parameter based on geolocation
  * 
  * @example
  * geoQuery(30,86,2000,SurveyData,"organization","Puente")
  * 
  * @param {number} a First number
  * @param {number} b Second number
  * @param {number} limit Max Number of Results
  * @param {string} parseClass Backend Model
  * @param {string} parseColumn Column in Backend Model
  * @param {string} parseParam Parameter in Column
  * @returns Results of Query based on Geolocation
  */
  public geoQuery(lat: number, long: number, limit: number , parseClass: string, parseColumn: string, parseParam: string): Promise<any> {
    let Parse = this.parseSrvc.getParseENV();
    //Returns the resolve (the query) and if there's an error, rejects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseClass);

        //Users Location by creaing geopoint
        var myLocation = new Parse.GeoPoint({latitude: lat, longitude: long});

        //Query
        //Queries the Class from Parse Server
        let query = new Parse.Query(SurveyData);
        
        // Interested in locations (GeoPoint Column in Parse) near user.
        //query.near("location", myLocation);
        query.withinMiles("location", myLocation, 5);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        // Retrieve the most recent ones
        query.descending("createdAt");

        //Limiting Results based on a specific paramater in a specific field/column
        query.equalTo(parseColumn, parseParam);

        //Below searches what's in the surveyPoints array
        query.find().then((results) => {
          resolve(results);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  /**
  * Performs a query of all records
  * 
  * @example
  * listAllPatients()
  * 
  * @returns a list of all objects in "SurveyData" Model
  */
  listAllPatients(){
    return this.parseSrvc.runCloudFunction("retrievePatientRecordsAll", null);
  }

  /**
  * Performs a query of all records in "SurveyData" Model based on Organization name
  * 
  * @example
  * listPatientsByOrganization("Puente")
  * 
  * @param {string} organization Name of Organization
  * @returns  a list of all objects in "SurveyData" Model based on organization
  */
  listPatientsByOrganization(organization){
    return this.parseSrvc.runCloudFunction("retrievePatientRecordByOrgnization", {
      organization: organization
    });

  }

  /**
  * Performs a query of all records in "SurveyData" Model based on Organization name
  * 
  * @example
  * cloudBasedQuery("Puente")
  * 
  * @param {number} offset
  * @param {number} limit Max Number of results to query
  * @param {string} parseColumn Name of Column within PatientID to search
  * @param {string} parseParam Name of Parameter within parseColumn to Select
  * 
  * @returns  a list of all objects in "SurveyData" Model based on parseParam in parseColumn
  */
  cloudBasicQuery(offset: number = 0, limit: number = 3, parseColumn: string, parseParam: string){
    return this.parseSrvc.runCloudFunction("retrieveAllPatientsByParam", {
      offset: offset,
      limit: limit,
      parseColumn: parseColumn,
      parseParam: parseParam
    });

  }

  /**
  * Test Cloud function
  * 
  * @example
  * hello()
  * 
  * @returns a console.log of hello
  */
  hello(){
    return this.parseSrvc.runCloudFunction("hello",null);
  }
  
}

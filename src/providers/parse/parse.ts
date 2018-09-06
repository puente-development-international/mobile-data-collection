import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Parse
import { Parse } from 'parse';

// Constants
import { ENV } from '../../app/app.constant';

@Injectable()
export class ParseProvider {
  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;
  private parseJavascriptKey: string = ENV.parseJavascriptKey;

  constructor() {
    this.parseInitialize();
    console.log('Initiated Parse');
  }

  /*
    Takes in local array and posts
  */
  
  public postObjectsToClass(localObject, parseClass:string): Promise<any> {
    //Creates and or Updates Parse Class
    //const SurveyData = Parse.Object.extend('SurveyData');
    const SurveyData = Parse.Object.extend(parseClass);
    let surveyPoint = new SurveyData();

    for (var key in localObject) {
      var obj = localObject[key];
      surveyPoint.set(String(key),obj);
    }

    
    var point = new Parse.GeoPoint(localObject.latitude,localObject.longitude);
    surveyPoint.set('location', point);
  
    

    return surveyPoint.save(null, {
      success: function (surveyPoint) {
        console.log(surveyPoint);
        return surveyPoint;
      },
      error: function (surveyPoint, error) {
        console.log(error);
        return error;
      }
    });
  }

  public postObjectsToClassWithRelation(localObject, parseClass:string,parseParentClass:string,parseParentClassID): Promise<any> {
    //Declare the types.
    const ChildClass = Parse.Object.extend(parseClass);
    const ParentClass = Parse.Object.extend(parseParentClass);

    let child = new ChildClass();
    let parent = new ParentClass();

    //Create child points
    for (var key in localObject) {
      var obj = localObject[key];
      child.set(String(key),obj);
    }

    var point = new Parse.GeoPoint(localObject.latitude,localObject.longitude);
    child.set('location', point);

    // Add the parent as a value in the child
    parent.id = String(parseParentClassID);
    child.set('client', parent);

    return child.save(null, {
      success: function (child) {
        console.log(child);
        return child;
      },
      error: function (child, error) {
        console.log(error);
        return error;
      }
    });
  }
  
  public removeObjectsinClass(objectIDinparseClass:string, parseClass:string):Promise<any>{

    var yourClass = Parse.Object.extend(parseClass);
    var query = new Parse.Query(yourClass);

    return query.get(objectIDinparseClass, {
      success: function(yourObj) {
        // The object was retrieved successfully.
        yourObj.destroy({});
      },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
    }
    }); 
  }

  getParseENV () {
    return Parse;
  }
  //Initialize Parse Server
  public parseInitialize() {
    //Back4app
    Parse.initialize(this.parseAppId,this.parseJavascriptKey);
    
    //Heroku
    //Parse.initialize(this.parseAppId);
    
    //Server
    Parse.serverURL = this.parseServerUrl;
  }

  runCloudFunction(functionName:string, functionRequest:any){
    return Parse.Cloud.run(functionName,functionRequest);
  }



}

import React, {Component} from 'react'
import Header from'./Header.js'
import './AddActivities.css'
import visibilities from './Visibility'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";

import ActivitieService from "./service/activities.service";
import Noty from 'noty';  
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css"; 
import AlgoliaPlaces from 'algolia-places-react';





const user = JSON.parse(localStorage.getItem("user"));
export default class AddActivities extends Component {

    constructor(props){
        super(props);
        this.handleActivities=this.handleActivities.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeLocation=this.onChangeLocation.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeStart=this.onChangeStart.bind(this);
        this.onChangeVisibility=this.onChangeVisibility.bind(this);

        this.state={
            description:"",
            location:"",
            name:"",
            start:"",
            visibility:"",

            successful:"",
            message:"",
            currentUser:[],
        };

    }
    componentDidMount(){
        this.getCurrentUser();
    }

    async getCurrentUser(){
        const response = axios.get("http://localhost:8080/user/me", {headers:{
            Authorization: `Bearer  ${user}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    });

    const {data} = await response;
    this.setState({currentUser:data});
    console.log(this.state.currentUser)


    }

    onChangeDescription(e){
        this.setState({
            description:e.target.value
        });
    }

    onChangeLocation(e){
        console.log(e.suggestion.name)
        this.setState({
            location:e.suggestion.name
        });
    }

    onChangeName(e){
       
        this.setState({
            name:e.target.value
        });
    }

    onChangeStart(e){

        this.setState({
            start:e.target.value
        });
    }

    onChangeVisibility(e){
      
        this.setState({
            visibility:e.target.value
        });
    }
    handleActivities(e){

        e.preventDefault();

        this.setState({
            message:"",
            successful:false
        });

        this.form.validateAll();
        console.log(this.form.validateAll());

        if(this.checkBtn.context._errors.length===0){
            ActivitieService.createActivitie(
                this.state.description,
                this.state.location,
                this.state.name,
                this.state.start,
                this.state.visibility
                ).then(response =>{
                    this.setState({
                        message:response.data.message,
                        successful:false
                    });
                }, 
                error=>{
                    const resMessage =
                    (error.response && 
                        error.response.data && 
                        error.response.data.message) || 
                        error.message||
                        error.toString();

                        this.setState({
                            successful:false,
                            message:resMessage
                        });
                }
                );
        }

        new Noty({
            type:"success",
            layout:"centerRight",
            text:"Votre activité a bien été créé",
            timeout:3000
        }).show();
    }

    render(){
    return(
      
           <div className="AddActivities">
           <Header />
        <h1>Ajouter une activité</h1>

        <Form 
        onSubmit={this.handleActivities}
        ref={c=>
            {this.form=c;
        }}>


        {!this.state.successful && (

      <div>
        <div class="form-row" className="test">
        <div class="form-group col-md-4">
        <label for="lastname">Nom de l'activité </label>
        <Input 
        type="text" 
        name="lastname" 
        class="form-control"
        value={this.state.name}
        onChange={this.onChangeName}
        id="lastname" />
        </div>

      
        <div class="form-group col-md-4">
        <label for="email">Organisateur</label>
        <input 
        Value={this.state.currentUser.username}
        type="text" 
        name="email"
        class="form-control"
        id="email"
        disabled></input>
        
        </div>
        </div>


        <div class="form-row" className="test">
        <div class="form-group col-md-4">
            <labal for="visibility">Visibility</labal>
        <select
        name="visibility"
        class="form-control"
        value={this.state.visibility}
                onChange={this.onChangeVisibility}
        
        >
            <option key="" ></option>
            {visibilities.map(visibility=>(
                <option key={visibility} >{visibility}</option>
            ))}


        </select>
       
        </div>
     


        <div class="form-group col-md-4">
        <label for="firstname">Lieu</label>
        <AlgoliaPlaces
      placeholder="address"
      name="lieu" 
      class="form-control"
     
      id="lieu"
     
      options={{
       
        language: 'fr',
        countries: ['fr'],
        type: 'city',
      }}
      onChange={this.onChangeLocation} 
     

      
      >


      </AlgoliaPlaces>
        </div>
        </div>

<div class="form-row" className="test">
<div class="form-group col-md-4">
        <label for="year">Date</label>
        <Input 
        type="date" 
        name="year" 
        class="form-control"
        value={this.state.start}
        onChange={this.onChangeStart}
        id="year" />
 </div>



 <div class="form-group col-md-4">
        <label for="mailConfirm">Heure</label>
        <Input 
        type="time" 
        name="mailConfirm" 
        id="mailConfirm"
        class="form-control"
      />
               </div>

               </div>
        

               <div class="form-group">
        <label>Autres participants</label>
        <textarea class="form-control" id="description3" rows="2"></textarea>

    </div>






    
    


    <div class="form-group">
    <label id="description" for="description">Informations complémentaires</label>
        <textarea class="form-control" rows="5" 
        value={this.state.description}
        onChange={this.onChangeDescription}></textarea>
    </div>



    <button type="submit" class="btn btn-light" id="submit">Ajouter l'évènement</button>

    </div>
    )}

{this.state.message && (
               <div>

                    <div className={this.state.successful
                    ?"alert alert-success"
                : "alert alert-danger"
            
            }
            role="alert"
                >
                    {this.state.message}

                    </div>

                    </div>

)}


<CheckButton
           style={{display:"none"}}
           ref={c=>{
               this.checkBtn=c;
           }}

           />
    
</Form>
</div>

     

      

    )
    }


}



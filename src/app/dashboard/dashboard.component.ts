import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpParams,HttpClient} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private geoJsonObject;
  private userLat: Number;
  private userLong: Number;
    public set_userLat(value: Number) {
        this.userLat = value;
    }
    public set_userLong(value: Number){
        this.userLong=value;
    }


    DestinationLat;
    DestinationLng;
    dir=null;



  today;

  departures:Array<any>=[];
  arrivals:Array<any>=[];
  Timetable:Array<any>=[];

  
  clicked = false;
  NoAvailabetrains=false;
  private selecteddeparture=null;
  private selectedarrival=null;
  private clickedMarkerLat=null;
  private clickedMarkerLong=null;

  constructor(private http:HttpClient, private auth:AuthService) { 
    var date = new Date();
    auth.handleAuthentication();

    var day:any = date.getDate();
    var month:any = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    this.today = year + "-" + month + "-" + day;
  }




  getData(){
    this.http.get<Array<any>>('http://localhost:5000/api/stops/')
    .subscribe(response=>
        {   
        this.departures=response;
        this.arrivals=response 
    })
  }


  prepareApiDepartures(){
      var a= 'http://localhost:5000/api/trip_plan/'+this.selecteddeparture+'/'+this.selectedarrival;
      console.log(a);
      return a;
  }

  getDepartures(){
    this.http.get<Array<any>>(this.prepareApiDepartures())
    .subscribe(response=>
    this.Timetable=response
    )
  }


  
 
  ngOnInit() {
   
  



    

    
this.getData();

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
       /*  infoWindow.setPosition(pos);
        map.setCenter(pos);
        
        map.data.loadGeoJson('http://localhost:5000/api/stops/nearby/'+this.userLat+'/'+this.userLong)
        console.log('http://localhost:5000/api/stops/nearby/'+this.userLat+'/'+this.userLong)
        console.log(this.userLat) */
        this.userLat=pos.lat;
        this.userLong=pos.lng;
        this.http.get('http://localhost:5000/api/stops/nearby/'+this.userLat+'/'+this.userLong).subscribe(data=>
    {
        this.geoJsonObject=data
    })
    });
}
   
    /* var mapOptions = {
        zoom: 13,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]

    };
 */
    
    
    /* var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var infoWindow = new google.maps.InfoWindow({map: map,
    content:'You are here'});

    google.maps.event.addListener(map, "click", function (event) {
        this.clickedMarkerLat = event.latLng.lat();
        this.clickedMarkerLong = event.latLng.lng();
        
    });

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
     */
    
    }

   clickedLayer($event) {
    this.DestinationLat=$event.latLng.lat()
    this.DestinationLng=$event.latLng.lng()
    this.getDirection(this.userLat,this.userLong,this.DestinationLat,this.DestinationLng)
   }
   public getDirection(originLat,originLng,destinationLat,destinationLng) {
    this.dir = {
      origin: { lat: originLat, lng: originLng },
      destination: { lat: destinationLat, lng: destinationLng },
      travelMode:'WALKING'
    }}

    send() {
    this.getDepartures();
    if (this.Timetable.length>0)
    this.clicked = true;
    else this.NoAvailabetrains=true;
  }

}

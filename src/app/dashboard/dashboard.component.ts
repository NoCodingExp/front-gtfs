import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpParams,HttpClient} from '@angular/common/http';

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

  
  userLat;
  userLong;

  departures:Array<any>=[];
  arrivals:Array<any>=[];
  Timetable:Array<any>=[];

  
  clicked = false;
  NoAvailabetrains=false;
  private selecteddeparture=null;
  private selectedarrival=null;
  

  constructor(private http:HttpClient) { 
    
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
    this.getUserLocation()



    

    
this.getData();
   

    
    var myLatlng = new google.maps.LatLng(36.43696902, 10.676975);
    var mapOptions = {
        zoom: 13,
        center: myLatlng,
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


    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
    });
    console.log(myLatlng)
    map.data.loadGeoJson('http://localhost:5000/api/stops/nearby/36.43696902/10.676975')
    // To add the marker to the map, call setMap();
    marker.setMap(map);
    }



  private getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.userLat = position.coords.latitude;
          this.userLong = position.coords.longitude;
          console.log(position);
        });
  
  
      }
      else console.log('GPS disabled')
    }
  
  send() {
    this.getDepartures();
    if (this.Timetable.length>0)
    this.clicked = true;
    else this.NoAvailabetrains=true;
  }

}

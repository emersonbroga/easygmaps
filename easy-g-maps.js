

//Initialize variables;
var $ = jQuery;
var slug = 'easy-g-maps';
var infowindow = new google.maps.InfoWindow();
var geocoder,
    map,
    marker,
    address, 
    width, 
    height, 
    lat, 
    lng, 
    type, 
    zoom;

//When document is ready
$(document).ready(function(){
    
    //When click in getCoordinates Button
    $('#'+slug+'btn-get-coordinates').live('click',function(){
        if( $('#'+slug+'address').val().length > 0){
            adminMapsCoordinates();
            
            $('#'+slug+'address').css('border', 'solid 1px #DFDFDF');
            $('#'+slug+'apikey').css('border', 'solid 1px #DFDFDF');
        }else{
            $('#'+slug+'address').css('border', 'dashed 1px red');
        }
        saveApiKey();
        return false;
    });
    
    //Reder all Embed Maps
    $('.'+slug+'embed').each(function(index, element){ 
        var $el = $(element);
        renderEmbedMap( $el.data('id'), $el.data('lat'), $el.data('lng'), $el.data('zoom'))
    });
});



/**
 * Admin Maps Coordinates
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function adminMapsCoordinates() {

    
    
    address= $('#'+slug+'address').val();
    width  = $('#'+slug+'width').val();
    height = $('#'+slug+'height').val();
    lat    = $('#'+slug+'latitude').text();
    lng    = $('#'+slug+'longitude').text();
    type = $('#'+slug+'type option:selected').val();
    zoom   = $('#'+slug+'zoom option:selected').val();

    //Zoom must be integer
    zoom = parseInt(zoom)
    
    
    showMap();
	
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.730885,-73.997383);
    var mapOptions = {
            scrollwheel: false,
            zoom: zoom,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    map = new google.maps.Map(document.getElementById(slug + "map"), mapOptions);
    adminGetAddressToCoordinates();
    
   
    return false;	 
}	




/**
 * Admin Get Address To Coordinates
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function adminGetAddressToCoordinates() {
  
    geocoder.geocode( { 'address': address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);

        //Passo os valores para o form.
        updateCoordinatesValues(results[0].geometry.location.lat(),results[0].geometry.location.lng());
        marker = new google.maps.Marker({
        	draggable: true,
                map: map,
                position: results[0].geometry.location           
            
        });
        map.setZoom(zoom);
            
        //DRAG AND DROP 
        google.maps.event.addListener(marker, "dragend", function(event) {
            var point = marker.getPosition();
            window.setTimeout(function(){
        	   map.panTo(point);
        	   updateCoordinatesValues(point.lat(), point.lng());
                   generateShortCode();
        	   
              }, 100);
        });
        generateShortCode();
        
      } else {
    	  showFeedback('#'+slug+'maps-feedback', 'Coordinates not found.');
    	  hideMap();
    	  updateCoordinatesValues('','');
    	  
      }
    });
  }


/**
 * Generate ShortCode
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function generateShortCode()
{
    // static map
    if( type === '2'){
        
        //Remove % and px
        width  = width.replace(/[^0-9]/g, '');
        height = height.replace(/[^0-9]/g, '');
    
        var staticMap = 'http://maps.googleapis.com/maps/api/staticmap?center='+lat+','+lng+'&zoom='+zoom+'&size='+width+'x'+height+'&maptype=roadmap&markers=color:red%7C'+lat+','+lng+'&sensor=false';
        $('#'+slug+'map').hide();
        $('#'+slug+'staticMap').attr('src',staticMap).show();
        
        $('#'+slug+'mapTip').hide();
        
    }else{
        $('#'+slug+'map').show();
        $('#'+slug+'staticMap').attr('src',staticMap).hide();
        
        $('#'+slug+'mapTip').show();
    }
    
    var mapId = new Date().getTime();
    mapId = slug+mapId;
    
    var shortcode = '[easygmaps width="'+width+'" height="'+height+'" lat="'+lat+'" lng="'+lng+'" type="'+type+'" zoom="'+zoom+'" id="'+mapId+'"]';
    $('#'+slug+'shortcode-output').show().text(shortcode );
    
    saveApiKey();
}

/**
 * Update CoordinatesValues
 * @param lat String 
 * @param long String
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function updateCoordinatesValues(newLat, newLng)
{   
    lat = newLat;
    lng = newLng;
    
    $('#'+slug+'latitude').text(lat);
    $('#'+slug+'longitude').text(lng);
    return;
}

/**
 * Show Feedback
 * @param element Seletor (jQuery)
 * @param message String
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function showFeedback(element, message) 
{
    if ( $(element).is(':visible'))
        $(element).text(message);
    else        
        $(element).text(message).fadeOut().fadeIn();

    return;
    
}

/**
 * Show Map
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function showMap()
{
    var $map = $('#'+slug+'map');
    
    $map.css('width', width);
    $map.css('height', height);
    $map.fadeIn();
   
    $('.options').show();
}

/**
 * Hide Map
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function hideMap()
{
    var $map = $('#'+slug+'map');
    $map.fadeOut();
    
    
    $map.css('width', '0%');
    $map.css('height', '0px');
    $('.options').hide();
}

/**
 * Save Api Key
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function saveApiKey()
{
    var $fieldApikey = $('#'+slug+'apikey');
    var apikey = $fieldApikey.val();
    var oldApikey = $fieldApikey.data('apikey');
   
    if( apikey !== oldApikey ){
        $.ajax({
        type: 'POST',
        url: '/wp-admin/admin-ajax.php',
        data: 'action=saveEasyGMapsApiKey&'+slug+'apikey='+apikey,
        success: function( response ){
                $fieldApikey.css('border', 'solid 1px green');
            }
        });
        
    }
}

/**
 * Render Embed Map
 * @param mapId String
 * @param lat String
 * @param lng String
 * @param zomm String
 * @author Emerson Carvalho <emerson.broga@gmail.com>
 */
function renderEmbedMap( mapId, lat, lng, zoom)
{
    //Zoom must be int
    zoom = parseInt(zoom);
 
    var latlng = new google.maps.LatLng(lat,lng);
    var mapOptions = {
            zoom: zoom,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    var embedMap = new google.maps.Map(document.getElementById(mapId), mapOptions);
    
    marker = new google.maps.Marker({
        	draggable: true,
                map: embedMap,
                position: latlng           
            
    });
}
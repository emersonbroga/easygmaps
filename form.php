<style>
    .hide{ display: none; }
    .options { display: none; }
    .tip {color: green; }
</style>

<table style="width: 100%;">
    <thead> 
        <tr>
            <td colspan="4"><span id="<?php echo EasyGMaps::slug; ?>maps-feedback"></span></td>
        </tr>
        <tr>
            <td colspan="1"><strong>ApiKey:</strong></td>
            <td colspan="3">
                <input type="text" name="<?php echo EasyGMaps::slug; ?>apikey" id="<?php echo EasyGMaps::slug; ?>apikey" value="<?php echo get_option(EasyGMaps::slug.'apikey'); ?>" placeholder="Google Maps Api Key" style="width: 100%;" data-apikey="<?php echo get_option(EasyGMaps::slug.'apikey'); ?>"/>
            </td>
        </tr>
        <tr>
            <td colspan="1"><strong>Addreess:</strong></td>
            <td colspan="3">
                <input type="text" name="<?php echo EasyGMaps::slug; ?>address" id="<?php echo EasyGMaps::slug; ?>address" value="" placeholder="Address" style="width: 100%;"/>
            </td>
        </tr>
        <tr> 
            <td colspan="1"><strong>Width:</strong></td>
            <td colspan="1"><input type="text" name="<?php echo EasyGMaps::slug; ?>width" id="<?php echo EasyGMaps::slug; ?>width" style="display:block;" value="450px"/></td>
            <td colspan="1" style="text-align: right;"><strong>Height:</strong></td>
            <td colspan="1"><input type="text" name="<?php echo EasyGMaps::slug; ?>height" id="<?php echo EasyGMaps::slug; ?>height" style="display:block;" value="300px"/></td>
        </tr>
        <tr>
            <td colspan="1"><strong>Type:</strong></td>
            <td colspan="1">
                <select name="<?php echo EasyGMaps::slug; ?>type" id="<?php echo EasyGMaps::slug; ?>type">
                    <option value="1" selected="selected">Embed Map</option>
                    <option value="2">Static Map Image</option>
                </select>
            </td>
            <td colspan="1" style="text-align: right;"><strong>Zoom:</strong></td>
            <td colspan="1">
                <select name="<?php echo EasyGMaps::slug; ?>zoom" id="<?php echo EasyGMaps::slug; ?>zoom">
                    <?php for($i=1;$i<=21; $i++) : ?>
                        <?php $selected = ( $i===15 ) ?  'selected="selected"' : ''; ?>
                        <option value="<?php echo $i; ?>" <?php echo $selected; ?> ><?php echo $i; ?></option>
                    <?php endfor; ?>
                </select>
            </td>
        </tr>
        <tr class="options"> 
            <td colspan="1"><strong>Latitude:</strong></td>
            <td colspan="1"><span id="<?php echo EasyGMaps::slug; ?>latitude" style="width: 100%; display:block;"></span></td>
            <td colspan="1" style="text-align: right;"><strong>Longitude:</strong></td>
            <td colspan="1"><span id="<?php echo EasyGMaps::slug; ?>longitude" style="width: 100%; display:block;"></span></td>
        </tr>
        <tr>
            <td colspan="4" style="width:100%; height: 40px; text-align: center"><button class="button" id="<?php echo EasyGMaps::slug; ?>btn-get-coordinates" onclick="return false;">Get Coordinates/Generate Shortcodes</button></td>
        </tr>
        
    </thead>
    <tr class="options">
        <td colspan="4" style="width:100%; height: 40px; text-align: center">
            <p><strong class="tip">Tip</strong>: Copy and Paste in your post content.</p>
            <textarea cols="80" rows="2" id="<?php echo EasyGMaps::slug; ?>shortcode-output" class="hide"></textarea>
        </td>
    </tr>
    
</table>
<div id="<?php echo EasyGMaps::slug; ?>map-canvas" class="options" >
    <p id="<?php echo EasyGMaps::slug; ?>mapTip"><strong class="tip">Tip</strong>: Drag and Drop the marker to select the exact location.</p>
    <div align="center" id="<?php echo EasyGMaps::slug; ?>map" ></div>
    <img src="http://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=0&size=450x300&sensor=false" id="<?php echo EasyGMaps::slug; ?>staticMap" />
</div>

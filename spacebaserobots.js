spacebase.robot = function(x, y){

	var object = {};

        object = new jaws.Sprite({x:x, y:y, scale: 2})
	object.occupied = false;
        object.move = function(x, y) {
         
          // Have our tile map return the items that occupy the cells which are touched by object.rect
          // If there's any items inside object.rect, reverse the movement (-> stand still)
          this.x += x
          //if(tile_map.atRect(object.rect()).length > 0) { this.x -= x }

          // Same as above but for vertical movement
          this.y += y
          //if(tile_map.atRect(object.rect()).length > 0) { this.y -= y }

	  //jaws.log("object: " + object.rect().toString())
        }

        var anim = new jaws.Animation({sprite_sheet: "droid_11x15.png", frame_size: [11,15], frame_duration: 100})
        object.anim_default = anim.slice(0,5)
        object.anim_up = anim.slice(6,8)
        object.anim_down = anim.slice(8,10)
        object.anim_left = anim.slice(10,12)
        object.anim_right = anim.slice(12,14)

        object.setImage( object.anim_default.next() );

	return object;
};


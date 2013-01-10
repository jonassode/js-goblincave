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

	object.work = function(){
		if ( this.path != undefined ){
			var next_cell = this.path[this.path_index];
			var x = this.rect().x;
			var y = this.rect().y;
			var next_x = next_cell.col *32
			var next_y = next_cell.row *32

			var direction;

			if ( next_x > x ) { direction = "right" }
			if ( next_x < x ) { direction = "left" }
			if ( next_y < y ) { direction = "up" }
			if ( next_y > y ) { direction = "down" }

			if(direction === "left"  ) { this.move(-1,0);  this.setImage(this.anim_left.next()) }
			if(direction === "right" ) { this.move(1,0);   this.setImage(this.anim_right.next()) }
			if(direction === "up"    ) { this.move(0, -1); this.setImage(this.anim_up.next()) }
			if(direction === "down"  ) { this.move(0, 1);  this.setImage(this.anim_down.next()) }

			if ( next_x === x && next_y === y ){
				this.path_index--;
				if ( this.path_index < 0 ){
					this.path = undefined;
					this.job.work(this);
				}
			}
		} else {
			this.setImage( this.anim_default.next() )
		}
	}

	return object;
};


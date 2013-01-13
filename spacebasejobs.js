spacebase.JOB_WALK = {type: 1};
spacebase.JOB_WALK.work = function(job, worker){
	// Release the worker
	worker.state = spacebase.STATE_IDLE;
	// Remove myself from joblist
	spacebase.jobs.remove(job);
}
spacebase.JOB_WALK.legal = function(job){
	if ( spacebase.tile_map.cell(job.col, job.row)[0].options.blocking == false ){
		return true;
	} else {
		return false;
	}
}

spacebase.JOB_BUILD = {type: 2};
spacebase.JOB_BUILD.work = function(job, worker){
	jaws.log("This is where the building starts.");

	// Release the worker
	worker.state = spacebase.STATE_BUILDING;
	// Remove myself from joblist
	job.setImage( job.anim_build.next() )
}
spacebase.JOB_BUILD.legal = function(job){
	if ( spacebase.tile_map.cell(job.col, job.row)[0].options.blocking == false ){
		return true;
	} else {
		return false;
	}
}

spacebase.job = function(type, target, col, row){

	var object = {};

        object = new jaws.Sprite({x:col*32, y:row*32, scale: 1})
	object.started = false;
	object.type = type;
	object.col = col;
	object.row = row;
	object.target = target;

        var anim = new jaws.Animation({sprite_sheet: "job_default.png", frame_size: [32,32], frame_duration: 100})
        object.anim_default = anim.slice(0,1)
        object.anim_build = anim.slice(1,9)

        object.setImage( object.anim_default.next() );

	object.work = function(worker){
		object.type.work(this, worker);
	}

	object.start = function() {
		var worker = getAvailableWorker();

		if ( worker !== undefined ) {
			var matrix = exportTileMapToPathMatrix();
			var start = {col: getTileNoFromCord(worker.rect().x), row: getTileNoFromCord(worker.rect().y) }
			var goal = {col: this.col, row: this.row }

			matrix[start.row][start.col] = 1;

			var shortest_path = jspath.find_path(matrix, start, goal);
			if ( shortest_path.length > 0 ){
				worker.path_index = shortest_path.length-2;
				worker.path = shortest_path;
				worker.state = spacebase.STATE_WALKING;
				worker.job = this;
				this.started = true;
			}
		}
	}

	return object;
};


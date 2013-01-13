spacebase.load_buildings = function(){

	var arr = new Array();

	arr["wall"]	 = {image:"building_wall.png",	blocking:true}
	arr["floor"]	 = {image:"building_floor.png",	blocking:false}
	arr["solarpanel"]= {image:"building_solarpanel.png",	blocking:true}

	return arr;
}

spacebase.buildingtypes = spacebase.load_buildings();

spacebase.building = function(type, col, row){

	var type = spacebase.buildingtypes[type];

	var object = new Sprite({image: type.image, x: col * 32, y: row * 32, blocking: type.blocking})

	return object;
};


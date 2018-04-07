var mainState = {
	
	preload: function(){
		
	   game.load.image('bird' ,'bird.png');
	   game.load.image('pipe' ,'pipe.png');
   },
	
   create: function() {
	 
        game.stage.backgroundColor= '#4DD0E1';
		
        game.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.bird = game.add.sprite(100,245, 'bird');
		
		game.physics.arcade.enable(this.bird);
		
		this.bird.body.gravity.y = 1000;
		
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
		
	   this.pipes = game.add.group();
	   
	   this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
	  
   },
   
   
    jump: function() {
			
		   this.bird.body.velocity.y = -350;
				   
	   },
	   
	   restartGame: function() {
		   game.state.start('main');
	  
		},
   
   
   update: function() {
	   
	   if (this.bird.y <0 || this.bird.y > 490){
		   this.restartGame(); 
	   }
	   
        game.physics.arcade.overlap(this.bird,this.pipes, this.restartGame, null, this)
	   
	  
	   },
	   
  
  addOnePipe: function(x,y) {
	  
	  var pipe = game.add.sprite(x, y, 'pipe') ;
	  this.pipes.add(pipe);
	  game.physics.arcade.enable(pipe);
	  pipe.body.velocity.x= -200;
	  
	  pipe.checkWorldBounds = true;
	  pipe.outOfBoundsKill = true;
	  
     },
	 
	 addRowOfPipes: function() {
		 
		 var hole = Math.floor(Math.random()*5)+1;
		 
		 for(var i=0; i < 8; i++){
		    if (i != hole && i != hole + 1) {
			 this.addOnePipe(400, i * 60 + 20);
			 
			}
			 
		 } 
		 
	 },
	  
  };
  
var game = new Phaser.Game(400, 490);
game.state.add('main', mainState);
game.state.start('main');
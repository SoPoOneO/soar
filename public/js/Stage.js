class Stage {

    constructor(id, world, pixel_width, pixel_height, pixels_per_meter, background_color) {
        this.id               = id;
        this.world            = world;
        this.pixel_width      = pixel_width || 600;
        this.pixel_height     = pixel_height || 400;
        this.pixels_per_meter = pixels_per_meter || 10;
        this.background_color = background_color || '#CCC';

        this.initializeContainer();
        this.initializeWorld();
        this.drawGuide();
    }

    initializeContainer(){
        this.dom_node = document.getElementById(this.id);
        this.dom_node.setAttribute('width', this.pixel_width);
        this.dom_node.setAttribute('height', this.pixel_height);
        this.dom_node.setAttribute('style', 'background-color: '+this.background_color);
    }

    initializeWorld(){
        var stage = this;
        stage.world.characters.forEach(function(character){
            character.dom_node = document.createElementNS('http://www.w3.org/2000/svg', 'image')
            character.dom_node.setAttributeNS('http://www.w3.org/1999/xlink','href', character.img);
            character.dom_node.setAttribute('preserveAspectRatio', 'none');
            character.dom_node.setAttribute('width', stage.metersToPixels(character.width));
            character.dom_node.setAttribute('height', stage.metersToPixels(character.height));
            stage.dom_node.appendChild(character.dom_node);

            character.forces.forEach(function(force){
                stage.initializeForce.call(stage, force);
            });
        });
    }

    initializeForce(force){
        force.dom_node = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        force.dom_node.setAttributeNS(null, 'stroke-width', 4);
        force.dom_node.setAttributeNS(null, 'stroke', force.color);
        this.dom_node.appendChild(force.dom_node);
    }


    addCharacter(character) {
        this.characters.push(character);
        character.world = this;
    }

    render(){
        var stage = this;
        stage.world.characters.forEach(function(character){
            stage.renderCharacter(character);
        });
    }

    renderCharacter(character) {
        var stage       = this;
        var position    = character.position;
        var angle       = character.orientation;
        var cog         = character.cog;
        var x           = position.getX();
        var y           = position.getY();
        var adjusted_x  = x - cog.getX();
        var adjusted_y  = y - cog.getY();

        var screen_x = this.metersToPixels(x);
        var screen_y = this.metersToPixels(y);
        var screen_adjusted_x = this.metersToPixels(adjusted_x);
        var screen_adjusted_y = this.metersToPixels(adjusted_y);

        character.dom_node.setAttribute('x', screen_adjusted_x);
        character.dom_node.setAttribute('y', screen_adjusted_y);
        character.dom_node.setAttribute('transform', 'rotate('+angle+' '+screen_x+' '+screen_y+')');

        character.forces.forEach(function(force){
            stage.renderForce(force);
        });
    }
   

    metersToPixels(meters){
        return meters * this.pixels_per_meter;
    }

    renderForce(force) {

        var cog_offset = force.getCogOffset();
        var character_pos = force.character.position;
        var value = force.getValue();

        var x1 = character_pos.getX() + cog_offset.getX();
        var y1 = character_pos.getY() + cog_offset.getY();
        var x2 = x1 + value.getX();
        var y2 = y1 + value.getY();

        var x1 = this.metersToPixels(x1);
        var y1 = this.metersToPixels(y1);
        var x2 = this.metersToPixels(x2);
        var y2 = this.metersToPixels(y2);
        force.dom_node.setAttribute('x1', x1);
        force.dom_node.setAttribute('y1', y1);
        force.dom_node.setAttribute('x2', x2);
        force.dom_node.setAttribute('y2', y2);
    }



    drawGuide(){

        var interval = 100;

        // verticals
        for(var i=interval; i<this.pixel_width; i+=interval){
            this.addLine(i, 0, i, this.pixel_height);
        }

        // horizontals
        for(var i=interval; i<this.pixel_height; i+=interval){
            this.addLine(0, i, this.pixel_width, i);
        }
    }

    addLine(x1, y1, x2, y2){
        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
        newLine.setAttribute('x1', x1);
        newLine.setAttribute('y1', y1);
        newLine.setAttribute('x2', x2);
        newLine.setAttribute('y2', y2);
        newLine.setAttributeNS(null, 'stroke-width', 1);
        newLine.setAttributeNS(null, 'stroke', 'red');
        this.dom_node.appendChild(newLine);
    }

}
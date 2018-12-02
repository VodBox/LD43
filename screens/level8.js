window.level8 = {
    name: "level8",
    load: function() {
        this.level = new PIXI.Container();

        let bg = new PIXI.Graphics();
        bg.beginFill(0, 0);
        bg.drawRect(0, 0, w, h);
        bg.endFill();

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(w/3, 0, w*2/3, h/10);
        roof.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h/2);
        wall1.endFill();

        this.breakable = new PIXI.Graphics();
        this.breakable.beginFill(0xAA8855, 1);
        this.breakable.drawRect(0, h/2, h/10, h/2);
        this.breakable.endFill();

        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, 0, h/10, h/2);
        wall2.endFill();

        this.door = new PIXI.Graphics();
        this.door.beginFill(0x5588AA, 1);
        this.door.drawRect(w-h/10, h/2, h/10, h/2);
        this.door.endFill();

        let floor1 = new PIXI.Graphics();
        floor1.beginFill(0x990000, 1);
        floor1.drawRect(0, h*9/10, w/3, h/5);
        floor1.endFill();
        let floor2 = new PIXI.Graphics();
        floor2.beginFill(0x990000, 1);
        floor2.drawRect(w*2/3, h*9/10, w/3, h/5);
        floor2.endFill();

        this.collisionSurfaces = [
            roof,
            wall1,
            wall2,
            floor1,
            floor2,
            this.breakable,
            this.door
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(roof);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(this.breakable);
        this.level.addChild(this.door);
        this.level.addChild(floor1);
        this.level.addChild(floor2);

        this.adj = [
            {
                level: window.level7,
                box: [0, h*19/20, w, h/10],
                offset: [0, -h*19/20]
            },
            {
                level: window.level17,
                box: [0, h/2, h/40, h/2],
                offset: [w*37/40, 0]
            },
            {
                level: window.level9,
                box: [w-h/40, h/2, h/40, h/2],
                offset: [-w*37/40, 0]
            },
            {
                level: window.level10,
                box: [0, -h/20, w/3, h/40],
                offset: [w/3 - h/10, h*18/20]
            },
        ];

        this.level.interactive = true;
        this.level.click = function(e) {
            for(let i = 0, l = this.adj.length; i < l; ++i) {
                let adj = this.adj[i];
                if(e.data.global.x > adj.box[0]
                    && e.data.global.x < adj.box[0] + adj.box[2]
                    && e.data.global.y > adj.box[1]
                    && e.data.global.y < adj.box[1] + adj.box[3]) {
                    stage.loadScreen = levels[adj.level.name];
                }
            }
        };
        this.level.adj = this.adj;

        this.loaded = true;

        return this;
    },
    tick: function() {
        if(this.newGame) {
            this.newGame = false;
            this.startCutscene = true;
            for(let i = 0, l = characters.length; i < l; ++i) {
                characters[i].screen = "level7";
                characters[i].char.x = h*3*(i+1)/20;
                characters[i].char.y = h*7/10;
            }
        }
    }
};

window.level15 = {
    name: "level15",
    load: function() {
        this.level = new PIXI.Container();

        let bg = new PIXI.Graphics();
        bg.beginFill(0, 0);
        bg.drawRect(0, 0, w, h);
        bg.endFill();

        let roof1 = new PIXI.Graphics();
        roof1.beginFill(0x990000, 1);
        roof1.drawRect(0, 0, w*2/5, h/3);
        roof1.endFill();
        let roof2 = new PIXI.Graphics();
        roof1.beginFill(0x990000, 1);
        roof1.drawRect(w*3/5, 0, w*2/5, h/3);
        roof1.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h);
        wall1.endFill();

        let floor = new PIXI.Graphics();
        floor.beginFill(0x990000, 1);
        floor.drawRect(0, h*2/3, w, h/3);
        floor.endFill();

        this.collisionSurfaces = [
            roof1,
            roof2,
            wall1,
            floor
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(roof1);
        this.level.addChild(roof2);
        this.level.addChild(wall1);
        this.level.addChild(floor);

        this.adj = [
            {
                level: window.level13,
                box: [0, 0, w, h/10],
                offset: [0, h/10]
            },
            {
                level: window.level16,
                box: [w-h/40, 0, h/20, h],
                offset: [-w*38/40, -h/6]
            }
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

window.level10 = {
    name: "level10",
    load: function() {
        this.level = new PIXI.Container();

        let bg = new PIXI.Graphics();
        bg.beginFill(0, 0);
        bg.drawRect(0, 0, w, h);
        bg.endFill();

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(0, 0, w, h/10);
        roof.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h/2);
        wall1.endFill();

        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, 0, h/10, h);
        wall2.endFill();

        let trap = new PIXI.Graphics();
        trap.beginFill(0x55FFAA, 1);
        trap.drawRect(w*3/4, h*8/10, h/5, h/10);
        trap.endFill();

        let floor1 = new PIXI.Graphics();
        floor1.beginFill(0x990000, 1);
        floor1.drawRect(0, h*9/10, w/3, h/10);
        floor1.endFill();
        let floor2 = new PIXI.Graphics();
        floor2.beginFill(0x990000, 1);
        floor2.drawRect(w*2/3 - h/10, h*9/10, w/3 + h/10, h/10);
        floor2.endFill();

        this.collisionSurfaces = [
            roof,
            wall1,
            wall2,
            floor1,
            floor2,
            trap
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(roof);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(floor1);
        this.level.addChild(floor2);
        this.level.addChild(trap);

        this.adj = [
            {
                level: window.level8,
                box: [0, h*19/20, w, h/10],
                offset: [-w/3 + h/10, -h*19/20]
            },
            {
                level: window.level11,
                box: [0, h/2, h/40, h/2],
                offset: [w*37/40, 0]
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

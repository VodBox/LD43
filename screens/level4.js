window.level4 = {
    name: "level4",
    load: function() {
        this.level = new PIXI.Container();

        this.loadItems = 2;
        this.loadedItems = 0;

        let bg = new PIXI.Sprite.from("levels/level4BG.png");
        bg.width = w;
        bg.height = h;
        bg._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        bg._texture.baseTexture.screen = this;
        bg._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        let fg = new PIXI.Sprite.from("levels/level4FG.png");
        fg.width = w;
        fg.height = h;
        fg._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        fg._texture.baseTexture.screen = this;
        fg._texture.baseTexture.on('loaded', function() {
            this.screen.loadedItems++;
            if(this.screen.loadedItems == this.screen.loadItems) {
                this.screen.loaded = true;
            }
        });

        let ground = new PIXI.Graphics();
        ground.beginFill(0x990000, 1);
        ground.drawRect(0, h*9/10, w, h/10);
        ground.endFill();

        let wall1 = new PIXI.Graphics();
        wall1.beginFill(0x009900, 1);
        wall1.drawRect(0, 0, h/10, h);
        wall1.endFill();
        let wall2 = new PIXI.Graphics();
        wall2.beginFill(0x009900, 1);
        wall2.drawRect(w-h/10, 0, h/10, h/2);
        wall2.endFill();

        let roof = new PIXI.Graphics();
        roof.beginFill(0x990000, 1);
        roof.drawRect(0, 0, w, h/10);
        roof.endFill();

        this.collisionSurfaces = [
            ground,
            wall1,
            wall2,
            roof
        ];

        this.spikeSurfaces = [];

        this.level.addChild(bg);
        this.level.addChild(ground);
        this.level.addChild(wall1);
        this.level.addChild(wall2);
        this.level.addChild(roof);
        this.level.addChild(fg);

        this.adj = [
            {
                level: window.level3,
                box: [w-h/40, h/2, h/20, h/2],
                offset: [-w*37/40, 0]
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

        this.loaded = false;
        this.loadItems = 2;
        this.loadedItems = 0;

        this.ladder = createItem("ladder.png", function(char) {
            climbables.push(this.ladderRepeat);
            stage.addChild(this.ladderRepeat);
            this.ladderRepeat.holder = char;

            this.ladderRepeat.screen = stage.activeScreen.name;
        }, function(char) {
            let hei = char.char.height;
            let inc = h/30;
            let cur = stage.activeScreen;
            for(let y = 0; y < 32; ++y) {
                let con = false;
                for(let i = 0, l = cur.collisionSurfaces.length; i < l; ++i) {
                    let surf = cur.collisionSurfaces[i];
                    if(surf.containsPoint({x:char.char.x,y:char.char.y+char.char.height - hei - inc})
                        || surf.containsPoint({x:char.char.x + char.char.width,y:char.char.y+char.char.height - hei - inc})) {
                        con = true;
                        break;
                    }
                }
                if(!con) {
                    hei += inc;
                } else {
                    break;
                }
            }
            this.ladderRepeat.x = char.char.x;
            this.ladderRepeat.y = char.char.y + char.char.height - hei;
            this.ladderRepeat.height = hei;
            this.ladderRepeat._texture.orig.width = char.char.width;
            this.ladderRepeat._texture.orig.height = 64;
            this.ladderRepeat.width = char.char.width;
            this.ladderRepeat.vis = true;
            this.ladderRepeat.offScreen = stage.activeScreen.name;
        }, function(char) {
            climbables.splice(climbables.indexOf(this.ladderRepeat), 1);
            stage.removeChild(this.ladderRepeat);
            this.ladderRepeat.screen = stage.activeScreen.name;
        }, function() {
            this.screen.level.addChild(this.screen.ladder);
            ++this.screen.loadedItems;

            let ladderRepeat = new PIXI.TilingSprite.from("ladderRepeat.png");
            ladderRepeat._texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            ladderRepeat._texture.baseTexture.screen = this.screen;
            this.screen.ladder.ladderRepeat = ladderRepeat;
            if(!ladderRepeat._texture.baseTexture.valid) {
                ladderRepeat._texture.baseTexture.on('loaded', function() {
                    this.screen.loadedItems++;
                    if(this.screen.loadedItems == this.screen.loadItems) {
                        this.screen.loaded = true;
                    }
                });
            } else {
                if(this.screen.loadedItems == this.screen.loadItems) {
                    this.screen.loaded = true;
                }
            }
        }, this);

        this.ladder.x = 400;
        this.ladder.y = 500;
        this.ladder.width = w/10;
        this.ladder.height = w/10;
        this.ladder.t = 0;

        return this;
    },
    tick: function() {
        if(this.newGame) {
            this.newGame = false;
            this.startCutscene = true;
            for(let i = 0, l = characters.length; i < l; ++i) {
                characters[i].screen = "level1";
                characters[i].char.x = h*3*(i+1)/20;
                characters[i].char.y = h*7/10
            }
        } else {
            if(this.ladder) {
                this.ladder.t++;
                this.ladder.rotation = Math.sin(this.ladder.t/60) * 0.2 + 0.1;
                let c = characters[parNum];
                let s = c.char;
                if(!c.holding) {
                    if(this.ladder.containsPoint({x: s.x, y: s.y})
                        || this.ladder.containsPoint({x: s.x + s.width, y: s.y})
                        || this.ladder.containsPoint({x: s.x + s.width, y: s.y + s.height-3})
                        || this.ladder.containsPoint({x: s.x, y: s.y + s.height-3})) {

                        this.level.removeChild(this.ladder);
                        c.holding = this.ladder;
                        this.ladder = undefined;

                        itemSound.play();
                    }
                }
            }

        }
    }
};

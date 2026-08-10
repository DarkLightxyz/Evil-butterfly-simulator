// setup
const canvas = document.getElementById("canvas"); 
const context = canvas.getContext("2d"); 
const body = document.querySelector("body"); 
document.getElementById("canvas").style.display = "none"; 
window.addEventListener("resize", resize); 

const butterfly = new Image(); 
butterfly.src = "images/Johnbody.png"; 
const topright = new Image(); 
topright.src = "images/Johntopleft.png"; 
const topleft = new Image(); 
topleft.src = "images/Johntopright.png"; 
const bottomleft = new Image(); 
bottomleft.src = "images/Johnbottomright.png"; 
const bottomright = new Image(); 
bottomright.src = "images/Johnbottomleft.png"; 

const grass = new Image(); 
grass.src = "graphics/RepeatingTallGrass.png"; 
const bg_image = new Image(); 
bg_image.src = "graphics/EBSBackground (20260804100320).jpg"; 
const daisy = new Image(); 
daisy.src = "graphics/daisy.png"; 
const cornflower = new Image(); 
cornflower.src = "graphics/cornflower.png"; 
const rose = new Image(); 
rose.src = "graphics/rose.png"; 
const orchid = new Image(); 
orchid.src = "graphics/orchid.png"; 
const dandelion = new Image(); 
dandelion.src = "graphics/dandelion.png"; 

const jollymusic = new Audio(); 
jollymusic.src = "music/jollyopt2.mp3"; 

// draw function 
const draw = () => {context.closePath(); context.fill();}

// circle function
const circle = function(xPos,yPos,radius,angle1=0,angle2=2*Math.PI) {
    context.beginPath(); 
    context.arc(xPos,yPos,radius,angle1,angle2,1); 
    draw(); 
}

// shape function 
function shape(list) {
    context.beginPath(); 
    context.moveTo(list[0][0],list[0][1]); 
    for (let i = 1; i < list.length; i++) {
        context.lineTo(list[i][0],list[i][1]); 
    }
}

// draw shape function 
draw_shape = (list) => {shape(list); draw()} 

// clear functions 
const clear = () => {context.fillStyle = "#00000010"; context.fillRect(0,0,canvas.width, canvas.height);}
const fullclear = () => {context.fillStyle = "#000000"; context.fillRect(0,0,canvas.width, canvas.height);}

let grassgenerator = []; 
for (let i = 0; i < 5; i++) {
    let subgrassgenerator = []; 
    for (let j = 0; j < 1000; j++) {
        subgrassgenerator.push(Math.random()); 
    }
    grassgenerator.push(subgrassgenerator); 
}

const x_aspect = 17;
const y_aspect = 9; 
const aspect_ratio = x_aspect/y_aspect; 

let cameraX = 0; 
let cameraY = 0; 
var keyidX; 
var keyidY; 
var fps = 60; 
let speed = 5; 
let speedX = 0; 
let speedY = 0; 
let easingX = .05; 
let easingY = .05; 
var placeholderspeedX; 
var placeholderspeedY; 
let camspeedX = 0; 
let camspeedY = 0; 
let imageW = 1066; 
let imageH = 617; 
let imagesize = .15; 
let grassW = 200; 
let grassH = 500; 
let grasssize = .6; 
let bg_imageW = 1920; 
let bg_imageH = 1008; 
let bg_imagesize = 2.7*canvas.height/bg_imageH; 
let daisyW = 1066; 
let daisyH = 617; 
let daisysize = .2; 
let cornflW = 510; 
let cornflH = 514; 
let cornflsize = .17; 
let roseW = 502; 
let roseH = 682; 
let rosesize = .14; 
let orchidW = 452; 
let orchidH = 682; 
let orchidsize = .15; 
let dandeW = 565; 
let dandeH = 881; 
let dandesize = .1; 
let cameraborderX = 40; 
let cameraborderY = 40; 
let bg_cam_mvmntX = .2; 
let bg_cam_mvmntY = .05; 
imageW *= imagesize; 
imageH *= imagesize; 
const hboxX = .7*imageW; 
const hboxY = .7*imageH; 
grassW *= grasssize; 
grassH *= grasssize; 
bg_imageW *= bg_imagesize; 
bg_imageH *= bg_imagesize; 
daisyW *= daisysize; 
daisyH *= daisysize; 
cornflW *= cornflsize; 
cornflH *= cornflsize; 
roseW *= rosesize; 
roseH *= rosesize; 
orchidW *= orchidsize; 
orchidH *= orchidsize; 
dandeW *= dandesize; 
dandeH *= dandesize; 
dandescollected = 0; 
var xPos = .5*canvas.width; 
var yPos = .5*canvas.height; 
var keys = {}; 

let time = 0; 
let truetime = 0; 
let timestamp = 0; 

let alphaplaceholder = 1; 
let alphaplaceholder2 = 0; 
let alphaplaceholder3 = 0; 

let score = 0; 
let neededscore = 50; 

let butterflycolor = "#6767ff98"; 

let daisygenerator = []; 
let daisypositions = []; 
let daisypos_pre = []; 

let cornflgenerator = []; 
let cornflpositions = []; 
let cornflpos_pre = []; 

let rosegenerator = []; 
let rosepositions = []; 
let rosepos_pre = []; 

let orchidgenerator = []; 
let orchidpositions = []; 
let orchidpos_pre = []; 

let dandegenerator = []; 
let dandepositions = []; 
let dandepos_pre = []; 

for (let i=0; i<1000; i++) {
    daisygenerator.push([50*canvas.width*(Math.random()-.5), 10*canvas.height*Math.random()+cameraborderY, .5+1.2*i/1000, Math.sign(Math.random()-.5),1]); 
    daisypositions.push([daisygenerator[i][0]+daisygenerator[i][3]*daisyW*daisygenerator[i][2]*.44,daisygenerator[i][1]+daisyW*daisygenerator[i][2]*.36]); 
    daisypos_pre.push([daisypositions[i][0],daisypositions[i][1]]); 
    cornflgenerator.push([50*canvas.width*(Math.random()-.5), 10*canvas.height*Math.random()+cameraborderY, .5+1.2*i/1000, Math.sign(Math.random()-.5),1]); 
    cornflpositions.push([cornflgenerator[i][0]+cornflgenerator[i][3]*cornflW*cornflgenerator[i][2]*.5,cornflgenerator[i][1]+cornflW*cornflgenerator[i][2]*.7]); 
    cornflpos_pre.push([cornflpositions[i][0],cornflpositions[i][1]]); 
}

for (let i=0; i<400; i++) {
    rosegenerator.push([50*canvas.width*(Math.random()-.5), canvas.height*(1.5+8.5*Math.random())+cameraborderY, .5+1.2*i/400, Math.sign(Math.random()-.5),1]); 
    rosepositions.push([rosegenerator[i][0]+rosegenerator[i][3]*roseW*rosegenerator[i][2]*.5,rosegenerator[i][1]+roseW*rosegenerator[i][2]*.8]); 
    rosepos_pre.push([rosepositions[i][0],rosepositions[i][1]]); 
}

for (let i=0; i<200; i++) {
    orchidgenerator.push([50*canvas.width*(Math.random()-.5), canvas.height*(1.5+8.5*Math.random())+cameraborderY, .5+1.2*i/200, Math.sign(Math.random()-.5),1]); 
    orchidpositions.push([orchidgenerator[i][0]+orchidgenerator[i][3]*orchidW*orchidgenerator[i][2]*.44,orchidgenerator[i][1]+orchidW*orchidgenerator[i][2]*.8]); 
    orchidpos_pre.push([orchidpositions[i][0],orchidpositions[i][1]]); 
}

for (let i=0; i<100; i++) {
    dandegenerator.push([50*canvas.width*(Math.random()-.5), 3*canvas.height*Math.random()+cameraborderY, .5+1.2*i/100, Math.sign(Math.random()-.5),1]); 
    dandepositions.push([dandegenerator[i][0]+dandegenerator[i][3]*dandeW*dandegenerator[i][2]*.47,dandegenerator[i][1]+dandeW*dandegenerator[i][2]*1.15]); 
    dandepos_pre.push([dandepositions[i][0],dandepositions[i][1]]); 
}

function vid_disappear(event) {
    document.getElementById("startcutscene").style.display = "none"; 
    document.getElementById("canvas").style.display = "block"; 
    jollymusic.loop = true;
    jollymusic.play(); 
    startinterval(); 
}

const moveX = function(direction) {xPos += speed*direction;} 
const moveY = function(direction) {yPos += speed*direction;} 

function movecameraX(direction) {
    cameraX -= speed*direction; 
}

function movecameraY(direction) {
    cameraY = Math.min(0, cameraY - speed*direction); 
}

function resize() {
    body.style.margin = "0px";

    let width = window.innerWidth;
    let height = width / aspect_ratio;
    if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height * aspect_ratio;
        body.style.margin = "0px " + ((window.innerWidth - width) / 2) + "px";
    }
    canvas.width = width;
    canvas.height = height;
    context.transform(1,0,0,-1,0,canvas.height); 
}

resize(); 

function movebutterfly() {
    window.addEventListener("keydown", 
        function(id) {
            keys[id.key] = true;
        }
    ); 
    window.addEventListener("keyup",
        function(id) {
            keys[id.key] = false;
        }
    ); 

    if (keys["ArrowRight"]) {
        speedX = Math.min(speedX + easingX,1); 
        camspeedX = Math.min(camspeedX + easingX,1); 
        moveX(speedX); 
    } else if (keys["ArrowLeft"]) {
        speedX = Math.max(speedX - easingX,-1); 
        camspeedX = Math.max(camspeedX - easingX,-1); 
        moveX(speedX); 
    } else if (!keys["ArrowRight"] || !keys["ArrowLeft"]) {
        if (Math.abs(speedX) <= easingX) {
        } else {
            speedX = speedX - easingX*Math.sign(speedX); 
            moveX(speedX); 
        }
        if (Math.abs(camspeedX) <= easingX) {
        } else {
            camspeedX = camspeedX - easingX*Math.sign(camspeedX); 
        }
    }

    if (keys["ArrowUp"]) {
        speedY = Math.min(speedY + easingY,1); 
        camspeedY = Math.min(camspeedY + easingY,1); 
        moveY(speedY); 
    } else if (keys["ArrowDown"]) {
        speedY = Math.max(speedY - easingY,-1); 
        camspeedY = Math.max(camspeedY - easingY,-1); 
        moveY(speedY); 
    } else if (!keys["ArrowUp"] || !keys["ArrowDown"]) {
        if (Math.abs(speedY) <= easingY) {
        } else {
            speedY = speedY - easingY*Math.sign(speedY); 
            camspeedY = camspeedY - easingY*Math.sign(camspeedY); 
            moveY(speedY); 
        }
        if (Math.abs(camspeedY) <= easingY) {
        } else {
            camspeedY = camspeedY - easingY*Math.sign(camspeedY); 
        }
    }

    if (xPos <= imageW/2+cameraborderX) {
        xPos = imageW/2+cameraborderX; 
        speedX = 0; 
        if (Math.abs(camspeedX) >= easingX) {
            movecameraX(camspeedX); 
        }
    } else if (xPos >= canvas.width-cameraborderX-imageW/2) {
        xPos = canvas.width-cameraborderX-imageW/2; 
        speedX = 0; 
        if (Math.abs(camspeedX) >= easingX) {
            movecameraX(camspeedX); 
        }
    }
    if (yPos <= imageH/2+cameraborderY) {
        yPos = imageH/2+cameraborderY; 
        speedY = 0; 
        if (Math.abs(camspeedY) >= easingY) {
            movecameraY(camspeedY); 
        }
    } else if (yPos >= canvas.height-cameraborderY-imageH/2) {
        yPos = canvas.height-cameraborderY-imageH/2; 
        speedY = 0; 
        if (Math.abs(camspeedY) >= easingY) {
            movecameraY(camspeedY); 
        }
    }
}

function movedaisy(time,i) {
    context.globalAlpha = daisygenerator[i][4]; 
    context.translate(20*(1-daisygenerator[i][4])*daisygenerator[1][2]*Math.sin(15*time),0); 
    daisygenerator[i][4] = Math.max(0, daisygenerator[i][4] - .02); 
    if (daisygenerator[i][4] == 0) {
        score += 1; 
        daisygenerator[i][1] = -1000; 
        daisypos_pre[i][1] = -1000; 
        daisygenerator[i][4] = 1; 
    } 
}

function movecornfl(time,i) {
    context.globalAlpha = cornflgenerator[i][4]; 
    context.translate(20*(1-cornflgenerator[i][4])*cornflgenerator[1][2]*Math.cos(15*time),0); 
    cornflgenerator[i][4] = Math.max(0, cornflgenerator[i][4] - .02); 
    if (cornflgenerator[i][4] == 0) {
        score += 1; 
        cornflgenerator[i][1] = -1000; 
        cornflpos_pre[i][1] = -1000; 
        cornflgenerator[i][4] = 1; 
    } 
}

function moverose(time,i) {
    context.globalAlpha = rosegenerator[i][4]; 
    context.translate(20*(1-rosegenerator[i][4])*rosegenerator[1][2]*Math.sin(12*time),0); 
    rosegenerator[i][4] = Math.max(0, rosegenerator[i][4] - .012); 
    if (rosegenerator[i][4] == 0) {
        score += 3; 
        rosegenerator[i][1] = -1000; 
        rosepos_pre[i][1] = -1000; 
        rosegenerator[i][4] = 1; 
    } 
}

function moveorchid(time,i) {
    context.globalAlpha = orchidgenerator[i][4]; 
    context.translate(20*(1-orchidgenerator[i][4])*orchidgenerator[1][2]*Math.sin(10*time),0); 
    orchidgenerator[i][4] = Math.max(0, orchidgenerator[i][4] - .005); 
    if (orchidgenerator[i][4] == 0) {
        score += 5; 
        orchidgenerator[i][1] = -1000; 
        orchidpos_pre[i][1] = -1000; 
        orchidgenerator[i][4] = 1; 
    } 
}

function killdande(time,i) {
    context.globalAlpha = dandegenerator[i][4]; 
    context.translate(20*(1-dandegenerator[i][4])*dandegenerator[1][2]*Math.sin(10*time),0); 
    dandegenerator[i][4] = Math.max(0, dandegenerator[i][4] - .005); 
    if (dandegenerator[i][4] == 0) {
        score += 10; 
        dandegenerator[i][1] = -1000; 
        dandepos_pre[i][1] = -1000; 
        dandegenerator[i][4] = 1; 
        dandescollected ++; 
    } 
}

function movedande(i) {
    let danderandom = .3+1.3*Math.random(); 
    dandegenerator[i][1] = ((dandegenerator[i][1] + danderandom) % (5*canvas.height)); 
    dandepositions[i][1] = ((dandepositions[i][1] + danderandom) % (5*canvas.height)); 
    dandepos_pre[i][1] = ((dandepos_pre[i][1] + danderandom) % (5*canvas.height)); 
}

function drawbutterfly(xPos,yPos,wingspeed) {
    context.globalCompositeOperation="source-over"; 
    context.drawImage(bottomleft,xPos-.435*imageW+imagesize*(2-54*Math.sin(wingspeed*time)),yPos-imageH/2,(.87+.1*Math.sin(wingspeed*time))*imageW,imageH); 
    context.drawImage(bottomright,xPos-.435*imageW-imagesize*(2+54*Math.sin(wingspeed*time)),yPos-imageH/2,(.87+.1*Math.sin(wingspeed*time))*imageW,imageH); 
    context.drawImage(topright,xPos-.435*imageW-imagesize*(2+54*Math.sin(wingspeed*time)),yPos-imageH/2,(.87+.1*Math.sin(wingspeed*time))*imageW,imageH); 
    context.drawImage(topleft,xPos-.435*imageW+imagesize*(2-54*Math.sin(wingspeed*time)),yPos-imageH/2,(.87+.1*Math.sin(wingspeed*time))*imageW,imageH); 
    context.drawImage(butterfly,xPos-imageW/2,yPos-imageH/2,imageW,imageH); 
    context.globalCompositeOperation="multiply"; 
    // context.fillStyle=butterflycolor; 
    // context.fillRect(xPos-.5*hboxX,yPos-.5*hboxY,hboxX,hboxY);
    context.globalCompositeOperation="source-over"; 
}

function drawflowers() {
    for (let i = 0; i < daisygenerator.length; i++) {
        context.save(); 
        context.scale(daisygenerator[i][3],1); 
        context.translate(daisygenerator[i][3]*daisygenerator[i][0],daisygenerator[i][1]); 
        daisypositions[i] = [daisypos_pre[i][0] + cameraX*daisygenerator[i][2]/2,daisypos_pre[i][1] + cameraY*daisygenerator[i][2]/2]; 
        if ((daisypositions[i][0] > xPos-.5*hboxX) && (daisypositions[i][0] < xPos+.5*hboxX) && (daisypositions[i][1] > yPos-.5*hboxY) && (daisypositions[i][1] < yPos+.5*hboxY)) {
            movedaisy(time,i); 
        }
        context.drawImage(daisy,daisygenerator[i][3]*cameraX*daisygenerator[i][2]/2,cameraY*daisygenerator[i][2]/2,daisyW*daisygenerator[i][2],daisyH*daisygenerator[i][2]); 
        context.restore(); 
        // context.fillStyle="#000000"; 
        // circle(daisypositions[i][0],daisypositions[i][1],5); 
        context.save(); 
        context.scale(cornflgenerator[i][3],1); 
        context.translate(cornflgenerator[i][3]*cornflgenerator[i][0],cornflgenerator[i][1]); 
        cornflpositions[i] = [cornflpos_pre[i][0] + cameraX*cornflgenerator[i][2]/2,cornflpos_pre[i][1] + cameraY*cornflgenerator[i][2]/2]; 
        if ((cornflpositions[i][0] > xPos-.5*hboxX) && (cornflpositions[i][0] < xPos+.5*hboxX) && (cornflpositions[i][1] > yPos-.5*hboxY) && (cornflpositions[i][1] < yPos+.5*hboxY)) {
            movecornfl(time,i); 
        }
        context.drawImage(cornflower,cornflgenerator[i][3]*cameraX*cornflgenerator[i][2]/2,cameraY*cornflgenerator[i][2]/2,cornflW*cornflgenerator[i][2],cornflH*cornflgenerator[i][2]); 
        context.restore(); 
        // context.fillStyle="#a86b6b"; 
        // circle(cornflpos_pre[i][0] + cameraX*cornflgenerator[i][2]/2,cornflpos_pre[i][1] + cameraY*cornflgenerator[i][2]/2,5); 
        if (i < rosegenerator.length){
            context.save(); 
            context.scale(rosegenerator[i][3],1); 
            context.translate(rosegenerator[i][3]*rosegenerator[i][0],rosegenerator[i][1]); 
            rosepositions[i] = [rosepos_pre[i][0] + cameraX*rosegenerator[i][2]/2,rosepos_pre[i][1] + cameraY*rosegenerator[i][2]/2]; 
            if ((rosepositions[i][0] > xPos-.5*hboxX) && (rosepositions[i][0] < xPos+.5*hboxX) && (rosepositions[i][1] > yPos-.5*hboxY) && (rosepositions[i][1] < yPos+.5*hboxY)) {
                moverose(time,i); 
            }
            context.drawImage(rose,rosegenerator[i][3]*cameraX*rosegenerator[i][2]/2,cameraY*rosegenerator[i][2]/2,roseW*rosegenerator[i][2],roseH*rosegenerator[i][2]); 
            context.restore(); 
            // context.fillStyle="#a86b6b"; 
            // circle(rosepos_pre[i][0] + cameraX*rosegenerator[i][2]/2,rosepos_pre[i][1] + cameraY*rosegenerator[i][2]/2,5); 
        }
        if (i < orchidgenerator.length){
            context.save(); 
            context.scale(orchidgenerator[i][3],1); 
            context.translate(orchidgenerator[i][3]*orchidgenerator[i][0],orchidgenerator[i][1]); 
            orchidpositions[i] = [orchidpos_pre[i][0] + cameraX*orchidgenerator[i][2]/2,orchidpos_pre[i][1] + cameraY*orchidgenerator[i][2]/2]; 
            if ((orchidpositions[i][0] > xPos-.5*hboxX) && (orchidpositions[i][0] < xPos+.5*hboxX) && (orchidpositions[i][1] > yPos-.5*hboxY) && (orchidpositions[i][1] < yPos+.5*hboxY)) {
                moveorchid(time,i); 
            }
            context.drawImage(orchid,orchidgenerator[i][3]*cameraX*orchidgenerator[i][2]/2,cameraY*orchidgenerator[i][2]/2,orchidW*orchidgenerator[i][2],orchidH*orchidgenerator[i][2]); 
            context.restore(); 
            // context.fillStyle="#a86b6b"; 
            // circle(orchidpos_pre[i][0] + cameraX*orchidgenerator[i][2]/2,orchidpos_pre[i][1] + cameraY*orchidgenerator[i][2]/2,5); 
        }
        if (i < dandegenerator.length){
            context.save(); 
            context.scale(dandegenerator[i][3],1); 
            context.translate(dandegenerator[i][3]*dandegenerator[i][0],dandegenerator[i][1]); 
            dandepositions[i] = [dandepos_pre[i][0] + cameraX*dandegenerator[i][2]/2,dandepos_pre[i][1] + cameraY*dandegenerator[i][2]/2]; 
            if (score >= neededscore) {
                alphaplaceholder3 = Math.min(alphaplaceholder3+.02,1); 
                context.globalAlpha = alphaplaceholder3; 
                movedande(i); 
                if ((dandepositions[i][0] > xPos-.5*hboxX) && (dandepositions[i][0] < xPos+.5*hboxX) && (dandepositions[i][1] > yPos-.5*hboxY) && (dandepositions[i][1] < yPos+.5*hboxY)) {
                    killdande(time,i); 
                }
                context.drawImage(dandelion,dandegenerator[i][3]*cameraX*dandegenerator[i][2]/2,cameraY*dandegenerator[i][2]/2,dandeW*dandegenerator[i][2],dandeH*dandegenerator[i][2]); 
            }
            context.restore(); 
            // context.fillStyle="#432f71"; 
            // circle(dandepos_pre[i][0] + cameraX*dandegenerator[i][2]/2,dandepos_pre[i][1] + cameraY*dandegenerator[i][2]/2,5); 
        }
    }
}

function drawelements() {
    context.drawImage(bg_image,(bg_cam_mvmntX*cameraX % bg_imageW),bg_cam_mvmntY*cameraY,bg_imageW,bg_imageH); 
    context.drawImage(bg_image,-bg_imageW+(bg_cam_mvmntX*cameraX % bg_imageW),bg_cam_mvmntY*cameraY,bg_imageW,bg_imageH); 
    context.drawImage(bg_image,bg_imageW+(bg_cam_mvmntX*cameraX % bg_imageW),bg_cam_mvmntY*cameraY,bg_imageW,bg_imageH); 
    for (let i = -500; i < 500; i++) {
        for (let j = 0; j < 5; j++) {
            if (grassgenerator[j][((i+500))] < .2) {
                context.drawImage(grass,i*(1-j/6)*grassW+(1-j/6)*(cameraX),(1-j/10)*cameraY+40*j,(1-j/6)*grassW,(1-j/6)*grassH); 
            }
        }
    }
    drawflowers(); 
    if (keys['ArrowRight'] || keys['ArrowLeft'] || keys['ArrowUp'] || keys['ArrowDown']) {
        drawbutterfly(xPos,yPos,25); 
    } else {drawbutterfly(xPos,yPos,5);} 
}

function drawScore(){
    context.save(); 
    context.scale(1,-1); 
    let scoreboard = " Score: " + score;
    context.font = "bold 40px Pirata One";
    context.fillStyle = "#ac3aa3";
    context.fillText(scoreboard, 1050, -600);
    context.strokeStyle = "#5b1268";
    // context.strokeText(scoreboard, 1100, -600);
    context.restore(); 
}

function animate(){
    time += 1/fps; 
    truetime += fps; 
    fullclear(); 
    movebutterfly(); 
    drawelements(); 
    if (truetime>=0 && truetime<=fps*120) {
        context.save(); 
        context.scale(1,-1); 
        context.font = "bold 40px Pirata One";
        if (truetime>fps*60) {
            alphaplaceholder = Math.max(alphaplaceholder-.02,0); 
            context.globalAlpha = alphaplaceholder; 
        }
        context.fillStyle="#9f2685"; 
        context.fillText("Explore around to collect flowers!", 370, -550); 
        context.strokeStyle = "#5b1268";
        context.strokeText("Explore around to collect flowers!", 370, -550);
        context.restore(); 
    }
    drawScore(); 
    if (dandescollected >= 5){
        cameraborderY = 100; 
        context.fillStyle="#af2e75"; 
        context.fillRect(canvas.width/2-15,canvas.height-82-8*Math.sin(6*time),30,50); 
        draw_shape([[canvas.width/2,canvas.height-8-8*Math.sin(6*time)],[canvas.width/2-30,canvas.height-42-8*Math.sin(6*time)],[canvas.width/2+30,canvas.height-42-8*Math.sin(6*time)]]); 
        if ((cameraY <= -2990) && (cameraY >= -3005)) {
            timestamp = truetime; 
            setTimeout(playendcutscene, 6000); 
        }
        if ((timestamp != 0) && (truetime > timestamp)) {
            alphaplaceholder2 = Math.min(1,alphaplaceholder2+.004); 
            context.globalAlpha = alphaplaceholder2; 
            context.fillStyle="#ffffff"; 
            context.fillRect(0,0,canvas.width,canvas.height); 
        }
    }
}

const startinterval = function() {interval_id = window.setInterval(animate, 1000/fps);}

function playendcutscene() {
    clearInterval(interval_id); 
    jollymusic.pause(); 
    document.getElementById("canvas").style.display = "none"; 
    document.getElementById("endcutscene").style.display = "block"; 
}

function towin() {window.location="IntroMenu.php";}
const approvedString = "Aaron Gold <aargold@deloitte.com>; Aaron Gold <ahg@aaronhgold.com>; Abad Kelly, Jessica <jabadkelly@deloitte.com>; Absher, Cameron <cabsher@deloitte.com>; Ball, Jacqueline <jaball@deloitte.com>; Berrizbeitia, Mauricio <mberrizbeitia@deloitte.com>; Birch-Desai, Jaya <jbirchdesai@deloitte.com>; Braunstein, Sarah <sabraunstein@deloitte.com>; Brumleve, Daniel <dbrumleve@deloitte.com>; Bui, Quan <qbui@deloitte.com>; Burden, Patrick <pburden@deloitte.com>; Byun, Sonia <sbyun@deloitte.com>; Capacyachi, Chiana <ccapacyachi@deloitte.com>; Cawley, Jake <jacawley@deloitte.com>; Chandrashekar, Anjali <achandrashekar@deloitte.com>; Chan, Ashley Jian-Mann <ashlchan@deloitte.com>; Chan, Nicholas <nichchan@deloitte.com>; Chen, Ruthie <ruthchen@deloitte.com>; Cheung, Evie <evicheung@deloitte.com>; Cotiaux, Alexa <alcotiaux@deloitte.com>; Curran, Jamie <jamcurran@deloitte.com>; Dannehower, Nicole <ndannehower@deloitte.com>; Davis, Michael A. <michaeldavis@deloitte.com>; Davis, Michelle E <michdavis@deloitte.com>; DiLeone, Beth Lewis <bdileone@DELOITTE.com>; Donahue, Dave <dadonahue@deloitte.com>; Eleniak, Meghan <meleniak@deloitte.com>; Etingue Kum, Menes K <metinguekum@deloitte.com>; Ferrao, Eva <eferrao@deloitte.com>; Greenough, Amanda <agreenough@deloitte.com>; Hall, Sally <sahall@deloitte.com>; Hoffman, Evan C <evahoffman@deloitte.com>; Hovanesian, Leon <lhovanesian@deloitte.com>; Jain, Aashika <aashikajain@deloitte.com>; Kahler, Kelley <kkahler@deloitte.com>; Kaushal, Atul <akaushal@deloitte.com>; Keelean, Brandon <bkeelean@deloitte.com>; Kim, Lily <lilkim@deloitte.com>; Kinchley, Peter <pkinchley@deloitte.com>; Kuehnle, Patrick <pkuehnle@deloitte.com>; Lafer, Casey <calafer@deloitte.com>; Lala, Sonia <solala@deloitte.com>; Lee, Kyle David <kyllee@deloitte.com>; Levitt, Emily <emlevitt@deloitte.com>; Lin, Sean <seanlin@deloitte.com>; Lipinsky, Yehezkel <ylipinsky@deloitte.com>; Litvak, Andrew <andlitvak@DELOITTE.com>; Mackenzie, Briony <bmackenzie@deloitte.com>; Mangialardi, Briana <bmangialardi@deloitte.com>; McCool, Pat <pmccool@deloitte.com>; Mee, Caitlin <camee@deloitte.com>; Melvin, Tinley <tmelvin@deloitte.com>; Mikkelsen, Olivia <omikkelsen@deloitte.com>; Murphy, Kendall <kenmurphy@deloitte.com>; Nair, Darshana <danair@deloitte.com>; Novak, Kira <kinovak@deloitte.com>; O'brien, Shannon <shaobrien@deloitte.com>; O'Connell, Deirdre <deoconnell@deloitte.com>; Parfrey, Patrick <pparfrey@deloitte.com>; Pekdemir, Mert <mpekdemir@deloitte.com>; Perry, Michael <miperry@deloitte.com>; Peterson, Jennifer <jenpeterson@deloitte.com>; Pipino, John <jpipino@deloitte.com>; Ratycz, Connor <cratycz@deloitte.com>; Riccardi, Louis <loriccardi@deloitte.com>; Robles, Rafael <rrobles@deloitte.com>; Royalty, Alex <aroyalty@deloitte.com>; Santos, Ana <anasantos@deloitte.com>; Sarin, Gaya <gayasarin@deloitte.com>; Schmidt, Zack <zaschmidt@deloitte.com>; Sikand, Armaan <asikand@deloitte.com>; Sircar, Abhinav <asircar@deloitte.com>; Sperling, Rebecca <rsperling@deloitte.com>; Tapper, Julius <jutapper@deloitte.com>; Turbek, Sarah <sarahturbek@deloitte.com>; Van Meter, Lucas <lvanmeter@deloitte.com>; Vasquez, Justyn <juvasquez@deloitte.com>; Vickery, Brendon <bvickery@deloitte.com>; Waldorf, Liz <lizwaldorf@deloitte.com>; Wang, Connie <connwang@deloitte.com>; Weikel, Kelly <kweikel@deloitte.com>; Zhang, Will <willxzhang@deloitte.ca>; Zhang, Willa <willazhang@deloitte.com>; Zheng, Catherine <czheng@deloitte.com>; Dunlop, Amelia <amdunlop@deloitte.com>; Tuff, Geoffrey <gtuff@deloitte.com>; Tull, Jeffrey <jtull@deloitte.com>; Wordham, Jeffrey <jwordham@deloitte.com>; Sommerfeld, Chris <chsommerfeld@deloitte.com>; Skarzynski, Peter <pskarzynski@deloitte.com>; Sherman, Courtney R <csherman@deloitte.com>; Ruiz, Samantha <sruiz@deloitte.com>; Peschiera, Francisco <fpeschiera@deloitte.com>; Keeley, Lawrence <lkeeley@deloitte.com>; Kang, Christine Young-Eun <youkang@deloitte.com>; Berry, Ashish <ashishberry@deloitte.com>; Brinker, Mike <mbrinker@deloitte.com>; Cowley, Andrew <ancowley@deloitte.com>; Cowser, David <dcowser@deloitte.com>; Fath, Megan <mfath@DELOITTE.com>; Fazio, Francesco <ffazio@deloitte.com>; Ayoub, Phillip <payoub@deloitte.com>; Gaskin, Jesse <tgaskin@deloitte.com>; Gross, Torsten <togross@deloitte.com>; Johnson, Ed <edwjohnson@deloitte.com>; Jonash, Benjamin <bjonash@deloitte.com>; Head, Kyndrea <kyhead@deloitte.com>; Zhang, William <wilzhang@deloitte.com>; Curran, Jamie K <jamicurran@deloitte.com>; Schmitz, Zack <zaschmitz@deloitte.com>; Blamire, Aurelia <aublamire@deloitte.com>; Josephson, Matthew <mjosephson@deloitte.com>; DiGann, Anya <adigann@deloitte.com>; Mangarella, Kate <kmangarella@deloitte.com>; Esser, Kat <kesser@deloitte.com>; Schiffer, Jade <jschiffer@deloitte.com>; Topinka, Andrew <atopinka@deloitte.com>; Ganoo, Saie <sganoo@deloitte.com>; Gualter, Shelby <sgualter@deloitte.com>; Bai, Evelyn <evebai@deloitte.com>; Saeque, Zarina <zasaeque@deloitte.com>; Phipps-Morgan, Ilona <iphippsmorgan@deloitte.com>; Foley, Mairen <mairfoley@deloitte.com>; Ervin, Renee <rervin@deloitte.com>; Doss, Anton <adoss@deloitte.com>; Li, James <jamesli@deloitte.com>; Liu, Brendan <breliu@deloitte.com>; Stilwell, Stanley <ststilwell@DELOITTE.com>; Salimi, Diba <dsalimi@deloitte.com>; Knauer, Andy <aknauer@deloitte.com>; Feller, Rachel <rfeller@deloitte.com>; Dimattia, Michelle <mdimattia@deloitte.com>; Yanovsky, Jessica <jyanovsky@deloitte.com>; Russo, Amelia <amrusso@deloitte.com>; Masliah, Alberto <amasliah@deloitte.com>; Zhao, Wendy <wenzhao@deloitte.com>; Lindsay, Isabel <islindsay@deloitte.com>; Muhlberger, Eric <emuhlberger@deloitte.com>; Lipsman, Dan <dlipsman@deloitte.com>; Cameron, Linda <licameron@deloitte.com>; Epstein, Jonathan <joepstein@deloitte.com>; Turczynski, Aaron <aturczynski@deloitte.com>; Koripamo, Doubara <dkoripamo@deloitte.com>; Kane, Brent <brekane@deloitte.com>; Robles, Carlos <carrobles@deloitte.com>; Coen, Steven <scoen@deloitte.com>; Lee, Val <valee@deloitte.com>; Hershey, Kevin <khershey@deloitte.com>; Adelman, Ashlyn <aadelman@deloitte.com>; Gibbs, Geri <ggibbs@deloitte.com>; Joyce, Kathleen <kajoyce@deloitte.com>; Kiaer, Erik <ekiaer@deloitte.com>; Miklic, Karen <kmiklic@deloitte.com>; Ochoa, Linda <lindochoa@deloitte.com>; Chan, Alexandra <alexanchan@deloitte.com>"

var array = approvedString.split(/[\<>]/);
module.exports = array;
console.log(array)
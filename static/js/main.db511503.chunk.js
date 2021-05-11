(this.webpackJsonpbrowser=this.webpackJsonpbrowser||[]).push([[0],{265:function(t,e,n){},279:function(t,e){},302:function(t,e){},304:function(t,e){},318:function(t,e){},319:function(t,e){},382:function(t,e){},384:function(t,e){},416:function(t,e){},421:function(t,e){},423:function(t,e){},430:function(t,e){},443:function(t,e){},461:function(t,e){},472:function(t,e){},475:function(t,e){},527:function(t,e,n){},531:function(t,e,n){"use strict";n.r(e);var c=n(2),r=n.n(c),a=n(246),s=n.n(a),i=(n(265),n(38)),o=n.n(i),u=n(148),l=n(6),h=n(7),j=n(13),b=n(12),f=n(547),d=n(541),p=n(548),O=n(542),x=n(543),m=n(544),v=n(545),g=n(546),k=n(149),w=n.n(k),C=n.p+"static/media/logo.6ae4c023.png",B=(n(527),n(10)),y="https://mainnet.infura.io/v3/".concat("95ddb76135024471a15efebe034aa17f"),S=new w.a.providers.HttpProvider(y),P=new w.a(S);var T=function(t){Object(j.a)(n,t);var e=Object(b.a)(n);function n(t){var c;return Object(l.a)(this,n),(c=e.call(this,t)).state={networkId:0},c}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var t=this;P.eth.net.getId().then((function(e){t.setState((function(){return{networkId:e}}))}))}},{key:"render",value:function(){return Object(B.jsxs)(v.a,{p:"2",children:[Object(B.jsx)("span",{children:"Network ID: "}),Object(B.jsx)("span",{children:this.state.networkId})]})}}]),n}(r.a.Component),I=function(t){Object(j.a)(n,t);var e=Object(b.a)(n);function n(t){var c;return Object(l.a)(this,n),(c=e.call(this,t)).state={peerCount:0},c}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var t=this;P.eth.net.getPeerCount().then((function(e){t.setState((function(){return{peerCount:e}}))}))}},{key:"render",value:function(){return Object(B.jsxs)(v.a,{p:"2",children:[Object(B.jsx)("span",{children:"Peer Count: "}),Object(B.jsx)("span",{children:this.state.peerCount+1})]})}}]),n}(r.a.Component),N=function(t){Object(j.a)(n,t);var e=Object(b.a)(n);function n(t){var c;return Object(l.a)(this,n),(c=e.call(this,t)).state={currentBlockNumber:0,transactionCount:0,timeTaken:0,tps:0,gasPrice:0},c}return Object(h.a)(n,[{key:"getEthStats",value:function(){var t=Object(u.a)(o.a.mark((function t(){var e,n,c,r,a,s,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,P.eth.getGasPrice();case 2:return e=t.sent,t.next=5,P.eth.getBlock("latest");case 5:if(n=t.sent,c=null,null===n.number){t.next=12;break}return t.next=10,P.eth.getBlock(n.parentHash);case 10:null!==(r=t.sent).number&&(a=n.timestamp-r.timestamp,s=n.transactions.length,i=s/a,c={currentBlockNumber:n.number,transactionCount:s,timeTaken:a,tps:i,gasPrice:e});case 12:return t.abrupt("return",c);case 13:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"calculateStat",value:function(){var t=Object(u.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getEthStats();case 2:e=t.sent,this.setState((function(){return{currentBlockNumber:e.currentBlockNumber,transactionCount:e.transactionCount,timeTaken:e.timeTaken,tps:e.tps,gasPrice:e.gasPrice}}));case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var t=this;this.calculateStat(),this.interval=setInterval((function(){return t.calculateStat()}),1e4)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return Object(B.jsxs)("p",{children:["Current Block #",this.state.currentBlockNumber,":"," ",this.state.transactionCount," in ",this.state.timeTaken," seconds at the rate of ",this.state.tps," transactions/seconds. The average gas price is"," ",this.state.gasPrice," wei."]})}}]),n}(r.a.Component);function D(t,e,n,c){return{txHash:t,block:e,timestamp:n,gasUsed:c}}var H=function(t){Object(j.a)(n,t);var e=Object(b.a)(n);function n(t){var c;return Object(l.a)(this,n),(c=e.call(this,t)).state={rows:[]},c}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var t=this;P.eth.getBlockNumber().then((function(e){console.log(e);for(var n=[],c=0;c<20;c++)P.eth.getBlock(e-c).then((function(e){var c=e.number,r=e.hash,a=e.timestamp,s=e.gasUsed;n.push(D(r,c,a,s)),t.setState((function(){return{rows:n}}))}))}))}},{key:"render",value:function(){return Object(B.jsxs)(g.a,{variant:"simple",children:[Object(B.jsx)(g.b,{children:"Latest 20 Blocks"}),Object(B.jsx)(g.f,{children:Object(B.jsxs)(g.g,{children:[Object(B.jsx)(g.e,{children:"Transaction Hash"}),Object(B.jsx)(g.e,{align:"right",children:"Block"}),Object(B.jsx)(g.e,{align:"right",children:"Timestamp"}),Object(B.jsx)(g.e,{align:"right",children:"Gas Used\xa0(wei)"})]})}),Object(B.jsx)(g.c,{children:this.state.rows.map((function(t){return Object(B.jsxs)(g.g,{children:[Object(B.jsx)(g.d,{component:"th",scope:"row",children:t.txHash}),Object(B.jsx)(g.d,{align:"right",children:t.block}),Object(B.jsx)(g.d,{align:"right",children:t.timestamp}),Object(B.jsx)(g.d,{align:"right",children:t.gasUsed})]},t.txHash)}))})]})}}]),n}(r.a.Component),F=function(){return Object(B.jsxs)(f.a,{children:[Object(B.jsxs)(d.a,{maxW:"xl",centerContent:!0,children:[Object(B.jsx)(p.a,{boxSize:"100px",objectFit:"cover",src:C,alt:"logo"}),Object(B.jsx)(O.a,{as:"h1",size:"xl",children:"Blockchain Explorer"}),Object(B.jsxs)(x.a,{children:[Object(B.jsx)(T,{}),Object(B.jsx)(m.a,{}),Object(B.jsx)(I,{})]}),Object(B.jsx)(N,{})]}),Object(B.jsx)("div",{className:"App",children:Object(B.jsx)(H,{})})]})},M=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,549)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,a=e.getLCP,s=e.getTTFB;n(t),c(t),r(t),a(t),s(t)}))};s.a.render(Object(B.jsx)(r.a.StrictMode,{children:Object(B.jsx)(F,{})}),document.getElementById("root")),M()}},[[531,1,2]]]);
//# sourceMappingURL=main.db511503.chunk.js.map
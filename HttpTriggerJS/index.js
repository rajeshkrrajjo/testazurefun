var request = require('request'); 
var webhookurl = "https://azure:Z3np0c$7@zenossdemo.cognizantgoc.com/zport/dmd/evconsole_router"; /* Target webhook url */

var url = webhookurl;

var evclasskey = "Azure"; /* Event class key value for Zenoss as provided by Zenoss administrator */
var evclass = "/Azure"; /* Event class value for Zenoss as provided by Zenoss administrator */

//Zenoss JSON payload variable definition. Values are not user configurable
var method = "add_event"; /* Zenoss method to create event */
var action = "EventsRouter"; /* Zenoss action component */
var summary = "description"; /* Event description extracted from Azure alert */
var severity = "Warning"; /* Severity information extracted from Azure alert */
var device = "Dev"; /*Device name extracted from Azure alert */
var component = "Comp"; /*Component name extracted from Azure alert */
var msgtype = "rpc"; /* Message type constant for Zenoss. Provided by Zenoss administrator */
var tid = 1; /* Tid constant value for Zenoss */


var AlertRuleName = "Alertrulenaem"
var Description = "description"
var Thresholdvalue = "thresholdval"
var severity1="severity"

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
       
// mapping the oms alerts with zenoss format
summary = "testing fun";
device = "testdevice";
component= "cpuperecntage"
severity = severity1;

 var zenjson = '{"action": "' + action + '","method": "' + method + '","data": [{"summary": "' + summary + '","device": "' + device + '","component": "' +  component + '","severity": "' + severity + '","evclasskey": "' + evclasskey +'","evclass": "' + evclass + '"}],"type": "' + msgtype + '","tid": "' + tid + '"}';
        var zentext = JSON.parse(zenjson);
        context.log(zentext);
        console.log(zentext);
 request({
               method: 'POST',
               uri: url,
               json: true,
               body: zentext
        },
        
        //HTTP response handling
        function (error, response, body) {
    if(response.statusCode == 200){
        context.res =
            {
                body: 'Posted successfully.'
            };
            context.log('Posted successfully.');
    } else {
        context.res =
            {
                status: response.statusCode,
                body: 'error: ' + body
            }
    }
        })

    context.done();
};
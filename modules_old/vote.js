//vote
////////////////THIS DOES NOT WORK YET//////////////////////////////////
var GoogleSpreadsheet = require("google-spreadsheet");
// spreadsheet key is the long id in the sheets URL
var v_sheet = new GoogleSpreadsheet('1Luab2bCJC723oKSobXVUenLkKTTIdDViga2PmIjqjQE');

module.exports = {
	//here goes the name of the function
	run: function(message, splitted, mybot){
		return;
		var creds = {
		  "type": "service_account",
		  "project_id": "alien-airfoil-125116",
		  "private_key_id": "7c0ed8ecefab2057394151a4d67dc84b33ee61aa",
		  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDKWxZwS6domuty\nCqd2E8Z1eb6LpPuKU+v7RUBclLtNo6aruO7MQIosiCt4KS97c74GcV3aMA866oEO\n125biASPp3r8jxFD0ptHYCxxLCXUubbm11FyOyuh25bDrkACo2SSrHn7nd+WZNaj\np3EMtiLobDeP2vB8vk8Qp/vMv612DpyWarPjzV86cKsBa4V0xHwtWrL15KIWWiMl\nTorumARAXeAYPk+PjAEY5bqsYvn1RBTYHLSNDFbQSBA4RqEeFOdI7cuJVzJzPQ0g\n6/5n0jq44s8F8OVWN4ybKF8Qnrq0tv5b/aPc/ryTaaf3QDc7odYN3gGeP8yTSbVm\nu3/FrQAxAgMBAAECggEBAIhWrtuiXX0BRDlmLEZGNKTaDiQQWNpuiMSXeDHok/pP\nlPCGfX5ozbALXx5qwW8wIIw+vblQQDK15ZaWV+ib0FbpxNd9nWhQ8gY5KjhmQmb9\nadpGoL2SWGeJiB73vHEKnaylQNrjF85Ays0g9+5UmVh38UefgADMSIE0bVcanki3\ngx+fwcjCHqnZThOQM1/9m/kqi7lWLfAF5AfdrZpD94Zu82j9zw9Krza113rTFyoJ\nR773znniQxNtYHKrBg9xIPidw6uTqDfZdU43iEY+srrG8o3dzR4PzrjVmKQvxM/P\nPKaXPkQsXPToKOowcFNTMNOV3I9/afvhXTnFW2wD7jECgYEA/S+fGLSgOZjRzgW2\npF3vJF/ULGb4nMZsVV8q8vl/lbBXn+503hcnxqcQVyK+bJBtM0BcGTjPRr8OZ1gi\ngWlFYXXF76ifNZY3M84lMZ/AFdAocB2L5sCZu4m4FiEo1RUXpkr1Ns+IXG0EbpS8\nJNFaO9BfbS0ITG1F37gJtshsy9MCgYEAzJrXYPkerfH/wOrtNxQXV+cXCy97Y3/R\nfOYEHZTYgir4Eg+TFZs2qukYoOtIeXd7YmQz1P55ywrkP/AxJxb7EncS0s1zh9Lg\n/hUJ4CiSkUr/6U3T5bmaT3PhZk6zmeLCOEjyIot80OUVn7AOnuGk37PvnAp1tk1r\nX7ehi3rmlWsCgYEA19QPoKThbRf7yc+PCYDVykEygoNo7WQsl34gA65yd20y1TAW\nSfidPLfPsyf4Al3/6M+1cv69m0ZlBe3YxE60CUe3avxoc+rQtgXGKQ5QVYfz4Ncf\nGp8WrgrRdXPg9fwcA/MkJAw35uo7+/Qoio44iIKxxkS8LUJ9bR/akAk8zWcCgYAc\nMprMOokH3/onVDktBg/RhX+fgwO2Sr9MP0cB7KmKBvH5SzwyFhoKo+VJCCQM2XKf\ntL+P8yJF4VJjnW6ovHoNqWtmsfniFiX73lpmEjFg5L0wIhG570JdANNnjiEibCXo\nK+Vy7VZeU7QPNexN6TsXuWykTKy8Wx8ZKe2Rk3aD0QKBgQC90+8uRXjKGwkNSoQp\n2u/u72v7Ue9rntH0fY+Z2d7iyZEzLOBt3a5326WhubiQqD5DM5w2QLR2YjGcuYqj\njblMrwtW3I0ePzyf7M6GZdhgO6j1ZntI5knZ3t0T1ORyS6bk1gciu3OkIaOyuGvn\nuSVvjQeSUNlELQJnmRcuHsDb6w==\n-----END PRIVATE KEY-----\n",
		  "client_email": "skynet@alien-airfoil-125116.iam.gserviceaccount.com",
		  "client_id": "107339469570558977711",
		  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
		  "token_uri": "https://accounts.google.com/o/oauth2/token",
		  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/skynet%40alien-airfoil-125116.iam.gserviceaccount.com"
		}

		v_sheet.useServiceAccountAuth(creds, function(err){
			// getInfo returns info about the sheet and an array or "worksheet" objects


			v_sheet.getInfo( function( err, sheet_info ){
				console.log( sheet_info.title + ' is loaded' );
				// use worksheet object if you want to stop using the # in your calls

				var sheet1 = sheet_info.worksheets[0];
				console.log(sheet1);
				// sheet1.addRow({options: "cyumus", votes: "0"}, function(err){
				// 	console.log(err);
				// });

			});

			// options = {
			// 	offset: 0,
			// 	limit: 100,
			// }
			// v_sheet.getRows(1, options, function(err, rows){
			// 	console.log(rows[0]);
			// });
		});
	},
	//What to return on help
	help: "`vote!` NOT OPERATIONAL",
	//Power needed to execute the command
	power: 0,

	permissions: [],
};
// https://docs.google.com/spreadsheets/d/1Luab2bCJC723oKSobXVUenLkKTTIdDViga2PmIjqjQE/edit?usp=sharing

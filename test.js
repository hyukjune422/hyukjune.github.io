var maxPercentage = 60;


if (window.location.href.indexOf('/lend') > -1) {
    const WEB3_URL = window.location.href.includes('staging') ? "https://web3dev.ev.io:2096" : "https://web3.ev.io:2096";

    $ = jQuery;

    let ownerID;
    let ownerUID;

    async function lendNFT(uid, percentage, nftAddress, flagId) {
        document.getElementById('lend-to-container').innerHTML = '<p>📡 Registering new scholarship..</p><br><br>';
        document.getElementById('lend-update-earn').innerHTML = '<p>📡 Requesting scholarship update....</p><br><br>';

        let sendData = {
            uid,
            nftAddress,
            flagId,
            percentage,
            ownerID
        };
        const response = await fetch(WEB3_URL + '/lend', {
            method: 'POST',
            body: JSON.stringify(sendData)
        });
        const json = await response.json();

        if (json.result.header) {
            document.getElementById('lend-to-container').innerHTML = '<p>Approved.</p><br><br>';
            document.getElementById('lend-update-earn').innerHTML = '<p>Approved.</p><br><br>';
            if (json.result.header === 'ok') {
                document.getElementById('lend-to-container').style.display = 'none';
                document.getElementById('lend-done-confirmation').style.display = 'block';
                window.location.reload();
            } else {
		if(json.result.cooldown)
		{
			console.log("cooldown");
			document.getElementById('lend-to-container').innerHTML = '<br><p>You cannot lend this NFT for another '+ json.result.cooldown +'</p>';
			setTimeout(()=>{ window.location.reload();}, 5000);
		}
		else
		{
        	        window.alert('Something went wrong lending your NFT. Please try again later.');
	                setTimeout(()=>{ window.location.reload(); }, 5000);
		}
            }
        } else {
            window.alert('Bad');
            setTimeout(hidePopupUI, 1500);
        }
    };

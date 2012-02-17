function SourceFactory(){

	this.getSource = function(sourceId){
		switch(sourceId){
			case "1":
				return new VisaSource();
				break;
			case "2":
				return new TicketSource();
				break;
		}	
	}	
	
}

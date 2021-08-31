package beans;

public class BuyerType {
	private BuyerRank buyerRank;
	private double discount;
	private static final int goldPoints=3000;
	private static final int silverPoints=2000;
	private static final int bronzePoints=1000;
	private static final double goldDiscount=10;
	private static final double silverDiscount=7.5;
	private static final double bronzeDiscount=5.0;
	
	
	public BuyerType() {
		buyerRank=BuyerRank.NO_RANK;
		discount=0;
	}
	
	public BuyerType(int points) {
		recalculateRank(points);
		
	}

	public void recalculateRank(double points) {
		if (points<bronzePoints) {
			this.discount=0;
			this.buyerRank=BuyerRank.NO_RANK;
		}else if(points>=bronzePoints && points<silverPoints) {
			this.discount=bronzeDiscount;
			this.buyerRank=BuyerRank.BRONZE;
		}else if(points>=silverPoints && points<goldPoints ) {
			this.discount=silverDiscount;
			this.buyerRank=BuyerRank.SILVER;
		}else {
			this.discount=goldDiscount;
			this.buyerRank=BuyerRank.GOLD;
		}
		
	}

	public BuyerRank getBuyerRank() {
		return buyerRank;
	}

	public void setBuyerRank(BuyerRank buyerRank) {
		this.buyerRank = buyerRank;
	}

	public double getDiscount() {
		return discount;
	}

	

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	
}

package beans;

public class BuyerType {
	private BuyerRank buyerRank;
	private double discount;
	private int requiredPoints;
	private static final int goldPoints=3000;
	private static final int silverPoints=2000;
	private static final int bronzePoints=1000;
	private static final double goldDiscount=10;
	private static final double silverDiscount=7.5;
	private static final double bronzeDiscount=5.0;
	
	
	public BuyerType() {
		buyerRank=BuyerRank.NO_RANK;
	}
	
	public BuyerType(BuyerRank buyerRank) {
		this.setBuyerRank(buyerRank);
		if (buyerRank==BuyerRank.GOLD) {
			this.requiredPoints=goldPoints;
			this.discount=goldDiscount;
		}else if(buyerRank==BuyerRank.SILVER) {
			this.requiredPoints=silverPoints;
			this.discount=silverDiscount;
		}else if(buyerRank==BuyerRank.BRONZE) {
			this.requiredPoints=bronzePoints;
			this.discount=bronzeDiscount;
		}else {
			this.requiredPoints=0;
			this.discount=0;
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

	public int getRequiredPoints() {
		return requiredPoints;
	}

	public void setRequiredPoints(int requiredPoints) {
		this.requiredPoints = requiredPoints;
	}
}

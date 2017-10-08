pragma solidity ^0.4.11;

contract P2PLending {
    
    address public owner = msg.sender;
    
    enum entityType{
            Lender,
            Borrower
    }
    
    struct Entity{
        entityType name;
        address account;
        bytes32 identificationNumber;
        uint rating;
        uint roi;
        uint period;
        bool isActive;
        mapping(address=>uint256) lended;
    }
    
    mapping(address=>Entity) public entities;
    mapping(address => uint) balances;
    
    modifier onlyOwner() { 
        if (msg.sender == owner) 
            _;   
    }
    
    function createEntity(entityType _type, address _account, bytes32 _idNo )public onlyOwner() returns (bool success){
        entities[_account].name = _type;
        entities[_account].account = _account;
        entities[_account].identificationNumber = _idNo;
        entities[_account].rating = 0;
        entities[_account].roi=0;
        entities[_account].period=0;
        entities[_account].isActive =false;
        // setting initial balance
        balances[_account] = 0;
        return true;
    }
    
    function setRateAndDays(address _account,uint roi,uint period )public returns(bool){
        entities[_account].roi = roi;
        entities[_account].period = period;
    }
    
    function enableEntity(address _account)public returns(bool){
        entities[_account].isActive = true;
        return true;
    }
    
    // change rating
    function increaseRating(address _account,uint amount) public onlyOwner() returns (uint){
        entities[_account].rating+=amount;
        return entities[_account].rating;
    }
    function decreaseRating(address _account,uint amount) public onlyOwner() returns(uint){
        entities[_account].rating-=amount;
        return entities[_account].rating;
    }
    
    // single getter
    function getEntity(address _account) public constant returns(entityType , address , bytes32, uint,uint,uint,bool ){
        return (entities[_account].name,entities[_account].account,entities[_account].identificationNumber,entities[_account].rating,entities[_account].roi,entities[_account].period,entities[_account].isActive);
    }
    
    // lending function
    function lend(address _lender, address _borrower,uint256 amount) public onlyOwner() returns(bool){
        if(balances[_lender] < amount)
            return false;
        balances[_lender]-=amount;
        balances[_borrower]+=amount;
        entities[_lender].lended[_borrower]=amount;
        return true;
    }
    
    function addBalance(address _account, uint256 value) public onlyOwner() returns(bool){
        balances[_account]+=value;
        return true;
    }
    
    function balanceOf(address _account)public constant returns(uint256){
        return balances[_account];
    }
    
    
}
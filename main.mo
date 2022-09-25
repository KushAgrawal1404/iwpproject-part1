import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap" ;
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
    actor Token {

        // Debug.print("Hello");
    var owner : Principal = Principal.fromText("xsedx-dxbjx-eycqt-dtqpl-jgcwy-w4nfl-jh3mb-4s275-6k2k6-dmefp-mae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DC";

    private stable var balanceEntries: [(Principal, Nat)] = [];
    // who owns how much of custom tokens
    //1- inital size of hash map
    //2- how we are going to check the for the equality of r keys?
    //3- how it should hash those keys?
    private var balances = HashMap.HashMap<Principal, Nat>(1,Principal.equal,Principal.hash);
    //insert value at key provided
    

    public query func balanceOf(who : Principal) : async Nat {
        let balance : Nat = switch(balances.get(who)){
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        //checking if this key exist in balances HashMap
        if(balances.get(msg.caller) == null){
            let amount = 5000;
            let result = await transfer(msg.caller, amount);
            // balances.put(msg.caller, amount);
            return result;
        }
        else{
            return "You have already claimed DC tokens.";
        }
        
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text{
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newFromBalance :Nat = fromBalance-amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;

            balances.put(to, newToBalance);
            return "Success";
        }
        else{
            return "Insufficient Funds";
        }
        
    };

    system func preupgrade(){
        //converts balances hashmap to array
        balanceEntries := Iter.toArray(balances.entries());

    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
        if(balances.size() < 1){
        balances.put(owner, totalSupply);
        }
    };
};

function skillsMember() {
    var member = {
        name: "John",
        age: 30,
        skills: ["Javascript", "HTML", "CSS"],
        address: {
            street: "123 Main St",
            city: "Boston",
            state: "MA"
        }
    };
    console.log(member.skills[0]);
    console.log(member.address.city);
}
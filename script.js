document.getElementById("addTopic").addEventListener("click", addTopic);
document.getElementById("gradeForm").addEventListener("submit", calculateGrade);

function addTopic() {
    const topicsContainer = document.getElementById("topicsContainer");
    const newTopicDiv = document.createElement("div");
    newTopicDiv.className = "topic";
    newTopicDiv.innerHTML = `
        <input type="text" placeholder="Topic Name" class="topic-name" required>
        <input type="number" placeholder="Score" class="topic-score" required>
        <input type="number" placeholder="Weight" class="topic-weight" required step="0.01">
        <button type="button" onclick="removeTopic(this)">-</button>
    `;
    topicsContainer.appendChild(newTopicDiv);
}

function removeTopic(button) {
    button.parentElement.remove();
}

function calculateGrade(event) {
    event.preventDefault();

    const topics = Array.from(document.getElementsByClassName("topic")).map(topic => ({
        name: topic.querySelector(".topic-name").value,
        weight: parseFloat(topic.querySelector(".topic-weight").value),
        score: parseFloat(topic.querySelector(".topic-score").value)
    }));

    let totalWeightedScore = 0;
    let totalWeight = 0;

    topics.forEach(topic => {
        totalWeightedScore += topic.score * (topic.weight / 100);
        totalWeight += topic.weight;
    });

    const grade = totalWeight ? (totalWeightedScore / (totalWeight / 100)) : 0;
    document.getElementById("result").innerText = `Your grade is: ${grade.toFixed(2)}%`;
}

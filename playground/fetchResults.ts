const results = async () => {
  try {
    const resDetails: IStatesDetails[] = await fetch("http://localhost:5959/api/states").then(d => d.json());
    if (!resDetails) throw new Error("details not found!");

    const resResults: IResults[] = await fetch("http://localhost:5959/api").then(d => d.json());
    if (!resResults) throw new Error("results not found!");

    const data: StateModel[] = resDetails.map(d => {
        return {...d, results: resResults.find(r => r.stateCode === d.code) || {}} as StateModel
    })
    console.log(data.find(d => d.code === "FL"));

  } catch (err) {
    const error = err as Error
    console.error(error.message)
  }
};

results();






interface IStateResult {
    [key: string]: number
}

interface IResults {
    stateCode: string;
    results: IStateResult;
}

interface IStatesDetails {
    name: string;
    code: string;
    electors: number;
}

interface StateModel extends IStatesDetails {
    results: IStateResult
}

import Item from "../model/Item";

const createItem = async (req, res) => {
  console.log("First time")
  const { name } = req.body;

  const { id } = req.user;
  
  if(!id){
    res.status(401).json({ message: "Unauthorized operation" });
  }

  const newItem = await Item.findOneAndUpdate(
    { name },
    {
      name,
    },
    {
      upsert: true,
      new: true,
    }
  );

  if (!newItem) {
    res.status(400).json({ message: "Item is not created" });
  }

  return res.status(201).json({ item: { name }, message: "Item is created" });
};

const getItem = async (req, res) => {
  const allItem = await Item.find({}).select("name -_id");

  if (!allItem) {
    res.status(4900).json({ message: "No Item is not created" });
  }

  return res.status(200).json({ message: "Ok", itemList: allItem });
};

const deleteItem = async (req, res) => {
  const { name } = req.query;
  const { id } = req.user;
  
  const deleteItem = await Item.findOneAndDelete({
    name,
  });

  if (!deleteItem) {
    res.status(400).json({ message: "Item can't be deleted" });
  }

  return res.status(200).json({ message: "Item deleted successfully" });
};

export { createItem, getItem, deleteItem };

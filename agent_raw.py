import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
  api_key=os.getenv("GroqAPIKey")
)

MAX_STEPS=5

messages = [
    {"role": "user", "content":"What do I need for chakalaka, and scale it up for 30 people?"}
]


def scale_recipe(servings_ratio: float, ingredients: list) -> list:
        # A deterministic scaling tool or multiplier
        return [f"{item} (scaled by {servings_ratio}x)" for item in ingredients]


def get_recipe(dish_name: str) -> dict:
        recipes = {
            "chakalaka": {
                "servings": 4,
                "ingredients": ["3 grated carrots", "1 can baked beans", "1 chopped onion", "1 tbsp curry powder"]
            }
        }
        return recipes.get(dish_name.lower(), {"error": "Recipe not found"})
        
TOOL_MAP = {"get_recipe": get_recipe,
            "scale_recipe": scale_recipe }

tools = [
        {
            "type": "function",
            "function": {
                "name": "get_recipe",
                "description": "Retrieves the standard ingredients and base yield for a South African dish.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "dish_name": {
                            "type": "string",
                            "description": "The name of the dish, e.g. chakalaka, bobotie, pap"
                        }
                    },
                    "required": ["dish_name"]
                }
            }
        },
        # second tool
        {
            "type": "function",
            "function": {
                "name": "scale_recipe",
                "description": "Scales a recipe according to the provided number of event people/guests.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "servings_ratio": {
                            "type": "number",
                            "description": "Ratio for serving"
                        },
                        "ingredients": {
                            "type": "array",
                            "items": {"type":"string"},
                            "description": "list of ingredients"
                        }    
                    },
                    "required": ["servings_ratio", "ingredients"]
                }
            }
        }
    ]
    




for step in range(MAX_STEPS):

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        tools=tools,
        tool_choice="auto",
        messages=messages
    )

    response_message=response.choices[0].message

    # 2. Check if the model wants a tool call
    if not response_message.tool_calls:
        # break loop and print content
        print (response_message.content)
        break
        
        

    else:
        # Append the assistant's call to history
        messages.append(response_message)
        
        # Handle each tool call
        for tool_call in response_message.tool_calls:
                function_name = tool_call.function.name
                arguments = json.loads(tool_call.function.arguments)
                func = TOOL_MAP.get(function_name)
                
                # Execute your Python function
                result = func(**arguments)
                
                # Append the result as role='tool'
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "name": function_name,
                    "content": json.dumps(result)
                })


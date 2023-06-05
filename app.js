const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabaseUrl = 'https://quvdsakyposgpzplnarj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dmRzYWt5cG9zZ3B6cGxuYXJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTkwODk5NCwiZXhwIjoyMDAxNDg0OTk0fQ.cbiRgdrWdxvTVmTnXzUNqzagm_ZNP3J2_Kl8ttPjEyU'; // Substitua com sua chave do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Obter todos os produtos
app.get('/products', async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      throw error;
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os produtos' });
  }
});

// Obter um produto por ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter o produto' });
  }
});

// Adicionar um produto
app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;

    const { data: product, error } = await supabase
      .from('products')
      .insert([{ name, price }]);

    if (error) {
      throw error;
    }

    res.status(201).json(product[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar o produto' });
  }
});

// Atualizar um produto
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const { data: product, error } = await supabase
      .from('products')
      .update({ name, price })
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
});

// Deletar um produto
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o produto' });
  }
});

app.listen(3000, () => {
  console.log('Servidor Back-End em execução na porta 3000');
});
